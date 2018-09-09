#!/bin/bash

npx cleancss --output build/you_have_to.css -- you_have_to.css

npx uglifyjs --enclose --compress --mangle --lint --output build/you_have_to.js -- \
    music/sonant.js music/song.js javascript/aaudio.js javascript/initialize.js \
    javascript/keyboard.js javascript/mainloop.js javascript/vec2.js \
    javascript/canvas.js javascript/background.js javascript/playersprite.js \
    javascript/player.js javascript/laser.js javascript/levels.js \
    javascript/stage.js javascript/main.js

npx html-minifier --collapse-whitespace --remove-attribute-quotes \
	--output build/index.html -- index_build.html

npx uglifyjs --parse expression --output build/manifest.json -- manifest.json
