# bubble popup
v 1.0 17/07/17
## uso
Para inicializar la burbuja solo debemos escribir la siguiente linea de JavaScript.
```JavaScript
// inicializar
bpop.init();
```
```autoRender``` puede recibir ```true``` o ```false``` de esto depende si genera el HTML de forma automatica, esto servira para que nosotros escribamos el HTML y poner contenido estatico por defualt dentro o luego lo hagamos con algun método de embebido.

La estrucura necesatia es la siguiente
```HTML

<section id="floatingBubbleContainer"> <!-- 1 -->
    <div class="bubble_default__bubble" id="floatingBubble"></div> <!-- 2 -->
    <div class="bubble_default__content minimized"> <!-- 3 -->
        <div class="bubble_default__internal">
            <!-- 4 -->
        </div>
    </div>
</section>
```

1. El contenedor padre, no posee estilos, solo se usa para agrupar todos los elemetos y reemplazar al document en el script.

2. La burbuja que vemos flotando de un lado para otro cuando el contenedor está oculto.

3. Un pre-contenedor para el wrapper de todo el contenido, para agregar estilos y comportamiento al cajon de forma aislada al contenido que se pueda insertar luego.

4. Finalmente el contenedor a donde pondremos todo el contenido que generemos.
----------------
```JavaScript
// detener ejecución
bpop.kill();
```
