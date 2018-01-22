# Manifestor v0.0.1


## Installation

```
npm install -g manifestor
```


## Usage

In your `package.json` file, add the field `manifestor`

```json
// The package.json file

{
    "manifestor": [
        {
            "directory": "./src",
        },
        {
           "directory": "./other-package",
           "options": [
              "**/.test.js"
           ]
        }
    ] 
}
```

then run

```
$ manifestor
```

You should see the output `manifest.js` file:

```
Generated manifest file at /your/project/manifest.js
```

This file is already requires source files from the `src` directory and the `other-package` directory (except the files end with `.test.js`)

The exclude option is following [minimatch](https://github.com/isaacs/minimatch) library

That's it!