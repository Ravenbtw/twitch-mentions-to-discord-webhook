import { ChatClient } from '@twurple/chat';
import axios from 'axios';

import config from './config/config.js';
const { server, username, webhook, triggers } = config;

const channels = [];

const chatClient = new ChatClient({
  channels,
});

await chatClient.connect();

chatClient.onMessage(async (channel, user, message) => {
  try {
    const wordsInMessage = message
      .replace(/[^a-z0-9_]/gi, ' ')
      .split(' ')
      .map((word) => word.toLowerCase());

    let isMention = false;

    loop: for (const { type, value } of triggers) {
      switch (type) {
        case 'word':
          if (wordsInMessage.includes(value)) {
            isMention = true;
            break loop;
          }
          break;
        case 'phrase':
          if (message.includes(value)) {
            isMention = true;
            break loop;
          }
          break;
      }
    }

    if (isMention)
      await axios.post(
        webhook,
        JSON.stringify({
          username: 'Mentions',
          embeds: [
            {
              color: 9520895,
              fields: [
                {
                  name: 'Channel',
                  value: channel,
                },
                {
                  name: 'Message',
                  value: message,
                },
              ],
            },
          ],
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  } catch (error) {
    console.log(error);
  }
});

const getFollowedChannels = async () => {
  try {
    const { error, follows } = (await axios.get(`${server}/${username}`)).data;

    if (error) throw error;

    follows.forEach(async (follow) => {
      try {
        if (!channels.includes(follow)) {
          channels.push(follow);

          await chatClient.join(follow);

          console.log(`Joining #${follow}`);
        }
      } catch (error) {
        console.log(error);
      }
    });

    channels.forEach(async (channel) => {
      try {
        if (!follows.includes(channel)) {
          channels.splice(channels.indexOf(channel), 1);

          await chatClient.part(channel);

          console.log(`Leaving #${follow}`);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getFollowedChannels();

setInterval(getFollowedChannels, 1000 * 60 * 10);
