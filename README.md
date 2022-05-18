# Mentions

Send Twitch mentions to a Discord channel with a webhook.

# Requirements

- NodeJS version supporting EJS imports.

# Setup

- Copy `default_config.js` and rename it to `config.js`.
- Fill in the fields
- Run `npm i` to install all modules.
- Run `npm start` to start listening for mentions.

# Types

- Phrase: Listens for messages that include the value in any word. For example: "hi" would pass if the message includes "Ohio." Spaces are allowed.
- Word: Listens for words. No spaces allowed.
