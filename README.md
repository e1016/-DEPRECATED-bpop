# bubble popup

bpop (bubble popup) es el plugin perfecto para ejecutar con react, vue o cualquier libreria que permita la programación reactiva, puedes verlo funcionando en [aquí](https://codepen.io/elimparable/pen/xrQqeO).

```JavaScript
// inicializar
bpop.init(contenedor_a_generar);
```
el parametro que enviemos en ```contenedor_a_generar``` servirá para asignar un ```id``` al espacio al que insertaremos nuestro HTML

## uso
El script renderiza todo el HTML que necesita, la estrucura generada por default es la siguiente
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

4. Finalmente el contenedor a donde empujaremos todo el contenido que creamos.
