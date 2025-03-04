import { Client, Events, GatewayIntentBits } from 'discord.js';
import { commands } from './commands';
import { config } from './config';
import { PRESENTATION_MESSAGES } from './constats';
import { deployCommands } from './desploy-commands';
import { LogLevels, slog } from './utils/log'


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
});

(async () => {
    deployCommands({ guildId: config.GUILD_ID! });
})();

client.once('ready', () => {
    slog(LogLevels.LOG, 'TutorandusBot is ready 🦾');
});

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

client.on('messageCreate', async (message) => {
    try {
        if (message.channel.id === config.CHANNEL_ID && !message.author.bot) {
            const role = message?.guild?.roles.cache.get(config.ROLE_ID!);

            if (
                !message.member?.roles.cache.has(role?.id != undefined ? role.id : '') &&
                role &&
                PRESENTATION_MESSAGES.some((item) => message.content.toLowerCase().includes(item))
            ) {
                await message.member?.roles.add(role);
                slog(LogLevels.INFO, `Added user ${message.member?.displayName} to the role '${role}'`)
            }
        }
    } catch (err) {
        slog(LogLevels.ERROR, `Unable to add role to user ${message.member?.displayName}`)
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);
