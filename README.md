# Building the Website

First, install the requirements

* Node.js
* inotify tools (only required for the watch command)
* Python dependencies

Then, to build the website simply run Make:

    make

To continuously update the build when things change, simply run

    make watch

# Serving the Website

To serve the website locally, change to the respective build
directory (build or analytics-build) and run

    python3 -m http.server

This will start a HTTP server on port 8000.
