# Space travel calculator

The space travel calculator uses special relativity equations to calculate from an observer and/or traveller's perspective:

- how long it would take to get from earth to another planet or star;
- how much fuel and energy is required,
- the maximum velocity the spaceship would reach and
- the length dilation of the spacecraft from the observer's perspective.

It also includes a simplistic visualisation of the journey.

The space travel calculator is implemented here:
http://spacetravel.nathangeffen.webfactional.com/spacetravel.php

## Caution

The main purpose of this project was so that I could learn several web
technologies and have fun at the same time. I am not a physicist or
engineer and it's quite possible there are misconceptions or glaring
calculation errors in this project.

## Installation

Pull the contents of this repository into a directory and
configure a web server to point to it. If you're using apache2, you
could simply copy everything into a folder of your default web directory (usually /var/www or /var/web).

Then open the directory root in your browser. An index.html page
redirects you to *spacetravel.php*.

## Files

### Main files

- spacetravel.php: HTML for space travel calculator. Also contains PHP to process AJAX calls.

- spacetravel.js: Javascript that handles the calculator.

- spaceanimation.js: Javascript that handles the animation.

- animation.svg: Scalar Vector Graphics file of a rocket, used by both spacetravel.php and spaceanimation.js.

- spacestart.js: Javascript that calls routines in both the above Javascript files.

- spacedifficulties.php, spacedifficulties.html and spacedifficulties.md: Essay on the difficulties of space travel. The MD file is the Markdown file that is used to generate, using Pandoc, the HTML one. The HTML file is included by the PHP file.

- spacehollywood.php: Some notes on space travel in Hollywood movies.

- spaceheader.php: Header PHP file used by the PHP files linked to from the menu. The menu is in this file.

- spacefooter.php: Footer file containing copyright and contact information.

- spacehelp.php: Hidden HTML containing help text for all the fields on the calculator form.

### Other files

- eq1 to eq12.mml: MathML files for equations in the documentation. These were created using OpenOffice's equation editor.
- COPYING: Copyright notice for this project.
- css and js folders: jquerygui folders
- favicon-*.png and favicon.ico: Favourite icon files.
- index.html: Redirects to spacetravel.php
- README: This file

## Authors

The Space Travel calculator was written by [Nathan Geffen](http://nathangeffen.webfactional.com/).

Faizel Slamang drew the robot used in the simulation.


