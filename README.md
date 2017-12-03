# nodejs-weather-microservice

Simple weather microservice that returns the weather for a given location.
This microservice example uses the Weather API from the
[OpenWeatherMap API](http://openweathermap.org/api) and has been created to
be used with my [Slack Bot API](https://github.com/coderade/nodejs-msb-slack-bot)
project

It is necessary to [create a account](https://home.openweathermap.org/users/sign_in)
to generate a API key and to use this service.

## Resilient Architecture
As this service has been created to be used with my Slack Bot API project as
an intent service to process the result a weather to be used on my natural
language processing with [wit.ai](https://wit.ai/).

I tried to make it resilient, so the service knows the endpoint address of the
main bot application (`http://127.0.0.1:3000/service/weather`) and it will try
to announce itself every 30 seconds and to intent it can serve.

The main [bot application](https://github.com/coderade/nodejs-msb-slack-bot) will
keep track of the services available and route the requests there.

## How to use

Download and install the Node.Js using the [NVM](https://github.com/creationix/nvm).

Install the [yarn](https://yarnpkg.com/en/) following the official
[documentation](https://yarnpkg.com/lang/en/docs/install/#linux-tab).

Clone the repository and install the node modules.

`yarn install`

After this, you can run the service.

## Running the service

To run this application, an [OpenWeatherMap API](http://openweathermap.org/api)
key is needed.

After you create your API key you will need to pass it as environment variable
parameter. I use the [WebStorm](https://www.jetbrains.com/webstorm) IDE to
debug my Node.js applications, which you can follow this
[tutorial](https://www.jetbrains.com/help/webstorm/run-debug-configuration-node-js.html) to
set Node.js environment variables in this IDE.

Otherwise you can pass the OpenWeatherMap API key directly on your command line.
To do this on the root directory of the project run the following command
passing your `OPEN_WEATHER_API_KEY` as env parameter:

`OPEN_WEATHER_API_KEY=<YOUR API KEY> node bin/run.js`

If everything is ok, the console will show the following message:

`The weather micro-service is listening on the http://localhost:PORT in development mode.
Error connecting to Coderade Bot.`

The service will try to connect on the
[bot application](https://github.com/coderade/nodejs-msb-slack-bot), so if the
bot application is not running you will receive the following error message:

`Error connecting to Coderade Bot.`

The service will try to connect again every 30 seconds and if the
bot application is not running yet, you will receive an error like this.

```
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


### Testing the service

The service is used with the bot application, but you can test it using the
your browser passing a LOCATION as URL parameter using the following URL:

`http://localhost:PORT/service/<LOCATION>`

Like the following example:

http://localhost:39269/service/curitiba

And you will receive a json response similar to this:

```json
{
"result": "few clouds at 18.5 degrees"
}
```
