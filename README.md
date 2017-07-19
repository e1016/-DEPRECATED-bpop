# bubble popup
v 0.1 - Find an example on [this link](https://codepen.io/e1016/pen/VWObge) applying ReactJs
## use

For quick use: ```https://codepen.io/e1016/pen/awrWQg.js```

For initilize the bubble only need write the next line
```JavaScript
// init
bpop.init({
  autoRender: true
});
```

```autoRender``` can recive ```true``` or ```false``` depending of this all the necesary HTML will render automaticly (we can push content with ReacJS or set manualy)

Auto-generated structure:
```HTML

<section id="floatingBubbleContainer"> <!-- 1 -->
    <div class="bubble_default__bubble" id="floatingBubble"></div> <!-- 2 -->
    <div class="bubble_default__content minimized"> <!-- 3 -->
        <div id="bpop" class="bubble_default__internal">
            <!-- 4 -->
        </div>
    </div>
</section>
```

1. The main container, haven't styles, it's only used for group all elements and replace all document in the script.
2. The bubble than we can see floating on screen.
3. A pre-contenedor used as a content wrapper, for add styles and behavior to the internal box.
4. Finally the container where we can add our content.
----------------
```JavaScript
// stopping script
bpop.kill();
```
