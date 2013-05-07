HTML5 Kids Game...?
=========
Currently Deployed at: http://finger-canvas.herokuapp.com/

This project utilizes the HTML5 [getUserMedia API] to manipulate the Canvas.

  - Currently the project is scoped to a single player game that will draw finger motion on a white board.
    - Version 0.2
  - There will potentially be a lobbying system that will delegate multi-player games in the next version.
    - Version 0.4
  - The game might get more complex [i.e. follow the leader or draw a specific image]
    - Version 0.6

Developers
-
####Seung Lim
[seung]
####Chad Reed
[chadreed-intl]
####Tyson Daughtery
[gigmania]
####Anthony Singhavong
[bigthyme]
####Philip Rosen
[philipjrosen]
Current Version
-
0.1.3: Added buttons for functionality

Inspiration
-
getUserMedia API demos:
1. https://github.com/tjerkw/js-cam-motion
2. https://github.com/ReallyGood/js-motion-detection
3. https://github.com/auduno/headtrackr/
    - http://dev.opera.com/articles/view/head-tracking-with-webrtc/
4. http://40win.com/blog/2012/11/14/web-gestures-with-getusermedia-part1/

algorithm demos:
1. http://mkweb.bcgsc.ca/color_summarizer/?
2. https://github.com/Huddle/Resemble.js
3. http://en.wikipedia.org/wiki/Feature_detection_(computer_vision)#Feature_detectors
4. https://github.com/mtschirs/js-objectdetect?source=cr
5. https://code.google.com/p/js-aruco/
 

Tech
-----------

This game uses a number of open source projects to work properly:


* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [jQuery] - duh

Git Workflow
--------------

```sh
From web UI do a 'fork': (https://github.com/hackreactor/divcage)
git clone (http://github.com/YOUR-REPO-HERE)
cd divcage
git remote add upstream (https://github.com/hackreactor/divcage)
git checkout -b (name of feature/bug branch you are working on)
WORK ON YOUR BRANCH
git add .
git commit -m "USEFUL COMMIT MESSAGE HERE"
git fetch upstream master
git pull upstream master (if there are changes...)
git push origin master
git checkout -b master
git merge (name of feature/bug branch you are working on)
git branch -D (name of feature/bug branch you are working on)
git add .
git commit -m "USEFUL COMMIT MESSAGE HERE"
git push origin master
From web UI do a 'pull-request': (http://github.com/YOUR-REPO-HERE)
Setup for pull-request: HackReactor/master <= YOUR-REPO-HERE/master
Wait for further notice on pull-request, check 'issues' to find more work for yourself.
```

License
-

MIT

  [1]: http://daringfireball.net/projects/markdown/
  [bigthyme]: https://github.com/bigthyme/
  [ace editor]: http://ace.ajax.org
  [node.js]: http://nodejs.org
  [Twitter Bootstrap]: http://twitter.github.com/bootstrap/
  [jQuery]: http://jquery.com
  [Express]: http://expressjs.com/
  [getUserMedia API]: http://www.html5rocks.com/en/tutorials/getusermedia/intro/
