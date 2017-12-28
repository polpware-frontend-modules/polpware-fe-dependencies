# Introduction

This repository defines the boundary between our packages
(principleware-fe-***) and the third party libraries we use.

# How to use it?

To use it, clone this repository and install it from your local disk. 
Or you can run the command: 

> yarn add https://github.com/principleware/principleware-fe-dependencies.git

Next follow two steps: 

1. Installing necessary third-party libraries

The set of _principleware_ packages in your application imply a set of
third party libraries. These third-party libraries should be a subset
of the listed packages defined in the *package.json* of this
repository. To make sure that you are using the proper versions,
please check *yarn.lock*.

2. Define the alias for the package names used in *index.js*.

For example, the following is the snippet from one *tsconfig.json*.

```javascript
        "paths": {
            "jquery": [
                "../node_modules/jquery/dist/jquery.js"          
            ],
            "locache": [
                "../node_modules/locache/build/locache.js"              
            ],
            "meld": [
                "../node_modules/meld/meld.js"
            ],
            "backbone": [
                "../node_modules/backbone/backbone.js"              
            ],
            "backbone-paginator": [
                "../node_modules/backbone.paginator/lib/backbone.paginator.js"
            ],
            "underscore": [
                "../node_modules/underscore/underscore.js"
            ],
            "constraintjs": [
                "../node_modules/constraintjs/build/cjs.js"
            ],
            "data-flow": [
                "../node_modules/model-js/dist/model.js"
            ],
            "state-machine": [
                "../node_modules/javascript-state-machine/dist/state-machine.js"
            ]
        }
```

In case that you do not need some third library, replace its path as below:

```javascript
            "state-machine": [
                "../node_modules/principleware-fe-dependencies/dummy.js"
            ]
```
