import { REST, Routes } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployConfigProps = {
  guildId: string;
};

export async function deployCommands({
  guildId,
}: DeployConfigProps): Promise<void> {
  try {
    console.log("Starting deploying commands");

    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      { body: commandsData }
    );

    console.log("Successfully deployed commands");
  } catch (e) {
    console.error("Got an error: ", e);
  }
}
