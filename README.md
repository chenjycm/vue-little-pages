# vue-little-swiper

## WATH IS THIS

This package is used for page switching. For example, fullscreen slide down. 

## USEAGE

1. Import plugin in main.js file.
```
    import vueLittlePages from 'vue-little-pages'
    Vue.use(vueLittelPages)
```
2. use the components in .vue. Here is an example of two pages
```
    <little-page>
        <little-page-item color="#d49898">
            <span>page1</span>
        </little-page-item>
        <little-page-item color="#aaf7f4">
            <span>page2</span>
        </little-page-item>
    </little-page>
```

## DEMO

The demo is based on vue-cli3. You can use it by:
```
npm install
npm run serve
```