tic tac toe js
==============

An attempt to implement tic tac toe using different frontend frameworks.



Implemented versions
====================

| Framework  | LoC (js + html) | Time   |
| ---------- | --------------- | ------ |
| Angular    | 145 (119 + 26)  |    45m |
| Elm        | 210 (N/A)       | 5h 20m |
| React      | 244 (N/A)       | 4h  5m |
| Vanilla.js | 145 (128 + 17)  |   < 3h |
| Vue.js     | 127 (98 + 29)   |    50m |



Notes
=====

* First the vanilla.js version was implemented as a guide for the other versions. Unfortunately I didn't note down how long it took me to implement it. But it took a bit less than 3 hours, including the logic, the PHP code to embed all versions and the CSS styling.

* Then the Vue.js version followed. Everything was straightforward and very intuitive.

* Then I decided to build the Angular version. While installing the necessary toolset (angular-cli) I struggled with file permissions for 15 minutes and I gave up.

* Then I started with React. Despite being the only modern JS framework that I had small prior experience with, it was still the less intuitive one by far. And it was hard to find solutions online for the latest version.

* Then it was time for highlight of the project: Elm. It was by far the most difficult one to work with. The syntax and the functional style were the biggest issues. The friendly error messages of the compiler weren't really helpful most of the time.

* Then I decided to give Angular another try. I was worried about struggling with file permissions once again, but `ng new` worked with the first try (!). I had to spend some time to familiarize myself with the code structure and remove all unnecessary boilerplate junk. Then everything was as almost intuitive as Vue.js. I only had to do 2 searches online (for the mouse* events and ngClass). Everything was copied over from the Vue.js solution almost verbatim. 



How to install
==============

1. Check out the project locally:
    ```
    git clone https://github.com/aletzo/tic-tac-toe-js.git
    ```

2. Go to `js/react` dir and execute:
    ```
    yarn run build
    ```

3. Edit `js/react/build/index.html` to fix the paths of the 3 static files.

4. Go to project root and start a local PHP server:
    ```
    php -S localhost:8000 router.php
    ```

5. Open the app in a browser:
    ```
    http://localhost:8000
    ```
