# Node.js Weather Microservice

A simple weather microservice that returns the weather for a given location. This microservice uses the Weather API from the [OpenWeatherMap API](http://openweathermap.org/api) and has been created to be used with my [Slack Bot API](https://github.com/coderade/nodejs-msb-slack-bot) project.

## Prerequisites

You need to [create an account](https://home.openweathermap.org/users/sign_in) on OpenWeatherMap to generate an API key to use this service.

## Resilient Architecture

As this service has been created to be used with my Slack Bot API project as an intent service to process weather information for natural language processing with [wit.ai](https://wit.ai/), it is designed to be resilient. The service knows the endpoint address of the main bot application (`http://127.0.0.1:3000/service/weather`) and will announce itself every 30 seconds to serve its intent.

The main [bot application](https://github.com/coderade/nodejs-msb-slack-bot) will keep track of the services available and route requests accordingly.

## How to Use

1. Download and install Node.js using [NVM](https://github.com/creationix/nvm).
2. Install [yarn](https://yarnpkg.com/en/) following the official [documentation](https://yarnpkg.com/lang/en/docs/install/#linux-tab).
3. Clone the repository and install the node modules:
    ```bash
    yarn install
    ```

## Running the Service

To run this application, an [OpenWeatherMap API](http://openweathermap.org/api) key is needed.

1. Create your API key.
2. Pass it as an environment variable parameter.

This project uses the [dotenv](https://github.com/motdotla/dotenv) module to load environment variables. In the root directory of the project, use the following command to copy the example environment file to the `.env` file:
    ```bash
    cp .env-example .env
    ```

3. Edit the `OPEN_WEATHER_API_KEY` environment variable with your generated key:
    ```plaintext
    OPEN_WEATHER_API_KEY=0000-0000-0000-0000-0000
    ```

4. You can also pass the environment variables in your IDE.

I use the [WebStorm](https://www.jetbrains.com/webstorm) IDE to debug my Node.js applications. You can follow this [tutorial](https://www.jetbrains.com/help/webstorm/run-debug-configuration-node-js.html) to set Node.js environment variables in this IDE.

Otherwise, you can pass the OpenWeatherMap API key directly in your command line. To do this in the root directory of the project, run the following command passing your `OPEN_WEATHER_API_KEY` as an environment parameter:
    ```bash
    OPEN_WEATHER_API_KEY=<YOUR API KEY> node bin/run.js
    ```

If everything is set up correctly, the console will show the following message:
```plaintext
The weather micro-service is listening on http://localhost:PORT in development mode.
Error connecting to Coderade Bot.
```

The service will try to connect to the [bot application](https://github.com/coderade/nodejs-msb-slack-bot). If the bot application is not running, you will receive the following error message:
```plaintext
Error connecting to Coderade Bot.
```

The service will try to connect again every 30 seconds. If the bot application is still not running, you will receive an error like this:
```plaintext
{ Error: connect ECONNREFUSED 127.0.0.1:3000
    at Object._errnoException (util.js:1031:13)
    at _exceptionWithHostPort (util.js:1052:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1195:14)
  errno: 'ECONNREFUSED',
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 3000,
  response: undefined }
```

## Testing the Service

The service is used with the bot application, but you can test it using your browser by passing a LOCATION as a URL parameter using the following URL:
```plaintext
http://localhost:PORT/service/<LOCATION>
```

For example:
```plaintext
http://localhost:39269/service/curitiba
```

You will receive a JSON response similar to this:
```json
{
  "result": "few clouds at 18.5 degrees"
}
```