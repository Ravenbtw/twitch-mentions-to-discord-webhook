const config = {
  server: 'https://mentions.raven.fo',
  username: '',
  webhook: '',
  triggers: [
    {
      type: 'word',
      value: 'ravenbtw',
    },
    {
      type: 'phrase',
      value: 'hello world',
    },
  ],
};

export default config;
