## Nativescript perf test apps

You can run each flavor using:

```shell
ns run run.android.production
```
You got env options that you can use like this `ns run run.android.production -- --env.option`

* `usefork` : Use Akylas fork which has some optimisations and allow more options
* `disablecss` : disable css to improve perfs (only with `usefork`)


To test app cold time start you can do this (replace for each flavor):
```shell
adb shell am start -S -W org.nativescript.vue.perfs/com.tns.NativeScriptActivity -c android.intent.category.LAUNCHER -a android.intent.action.MAIN
```

To test app warm start time you can do this one (replace for each flavor):

```shell
adb shell am start -W org.nativescript.vue.perfs/com.tns.NativeScriptActivity -c android.intent.category.LAUNCHER -a android.intent.action.MAIN
```


## recording results
You can use the `app_compare.blend` to easily create an edit video using Blender



## Results

You can directly compare those results to RN as RN does most of its loading after the activity gets displayed

### A3 2017 [specs](https://www.gsmarena.com/samsung_galaxy_a3_(2017)-8336.php)


### Vue (`--env.usefork --env.disablecss`)

#### references

* `app-release.apk`: 
* `vendor.js`: 418kb
* `classes.dex`: 2.3mb

#### Start times

```
Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=org.nativescript.vue.perfs/com.tns.NativeScriptActivity }
Status: ok
LaunchState: COLD
Activity: org.nativescript.vue.perfs/com.tns.NativeScriptActivity
TotalTime: 4372
WaitTime: 4379
Complete
```
```
Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=org.nativescript.vue.perfs/com.tns.NativeScriptActivity }
Status: ok
LaunchState: WARM
Activity: org.nativescript.vue.perfs/com.tns.NativeScriptActivity
TotalTime: 3188
WaitTime: 3189
Complete
```

### Svelte (`--env.usefork --env.disablecss`)

#### references

* `app-release.apk`: 22.7mb (universal  arm64-v8a,armeabi-v7a,x86,x86_64)
* `bundle.js`: 4kb
* `vendor.js`: 656kb
* `classes.dex`: 2.3mb
* `metadata`: 1.3mb

#### Start times

```
Stopping: org.nativescript.svelte.perfs
Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=org.nativescript.svelte.perfs/com.tns.NativeScriptActivity }
Status: ok
LaunchState: COLD
Activity: org.nativescript.svelte.perfs/com.tns.NativeScriptActivity
TotalTime: 4149
WaitTime: 4151
Complete
```
```
Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=org.nativescript.svelte.perfs/com.tns.NativeScriptActivity }
Status: ok
LaunchState: WARM
Activity: org.nativescript.svelte.perfs/com.tns.NativeScriptActivity
TotalTime: 2943
WaitTime: 2945
Complete
```