# frontend-boiler

Pet project to trick me into learning front end software engineering.  I want to start producing customer facing application and refuse to learn other java script frameworks.

# Build
This git repo comes with a makefile that will package the app together with webpack, copy the files into a docker image and creates a container named  `frontend` running on port 8080.  Run the following commands in the root directory.
```
npm install
make dev
```

To clean the workspace and remove the docker image run `make clean`
