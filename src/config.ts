import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, GUILD_ID, CHANNEL_ID, ROLE_ID, EMOJI_ID, SPECIAL_ROLE_ID } = process.env;

if (!DISCORD_CLIENT_ID || !DISCORD_TOKEN || !GUILD_ID) {
    throw new Error('Missing environment variables');
}

export const config = { DISCORD_TOKEN, DISCORD_CLIENT_ID, GUILD_ID, CHANNEL_ID, ROLE_ID, EMOJI_ID, SPECIAL_ROLE_ID };
