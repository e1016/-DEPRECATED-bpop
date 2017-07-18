   /////////////////////////////////////
  // burbuja flotante         -v 0.1 //
 // z-index: 999                    //
/////////////////////////////////////
	
var bpop = {
	init: function() {
		this.renderDom();
		this.cacheDom();
		this.bindListeners();
		this.itIsActived = false;

		// inicializando bmod
		bmod.cacheDom();
		return "All it's Ok"
	},
	kill: function() {
		// soon
	},
	displayContainer: function() {
		this.itIsOpen = true;
		this.$draggable.style.transition = 'left 0.2s ease, top 0.2s ease, transform 0.2s ease';
		this.$draggable.style.left = '5px';
		this.$draggable.style.top = '5px';

		// generando fondo en fadeIn
		this.$mainContentParent.appendChild(this.$bgFade);
		setTimeout(function() {
			bpop.$draggable.style.transition = 'transform 0.2s ease';
			bpop.$mainContentWrapper.classList.remove('minimized')
			bpop.itIsActived = true;
		}, 200);

		// obteniendo el background desde el DOM
		this.$fadeBg = this.$mainContentParent.querySelector('.bubble_default__bg');
		this.$fadeBg.style.opacity = '1';
	},
	dragg: function(e) {
		// la variable this.draggActives se encarga
		// de determinar si es momento de que la
		// burbuja siga la posición del mouse.
		// referecia a true #02
		// referecia a false #03

		if (this.draggActives) {
			this.x = e.clientX;
			this.y = e.clientY;
			
			this.$draggable.style.left = (this.x - 35) + 'px';
			this.$draggable.style.top = (this.y - 35)  + 'px';

			this.$mainContentWrapper.classList.add('minimized');
		}
	},
	draggOn: function(e) {
		// activando dragado
		// ancla #02
		this.draggActives = true;

		// referencia #01
		this.initialStaticalClientX = e.clientX;
		this.initialStaticalClientY = e.clientY;

		// bindeando evento para el dragado en toda la ventana
		window.addEventListener('mousemove', bpop.dragg.bind(this) );
	},
	disableDragg: function(e) {
		// ancla #03
		this.draggActives = false;
		
		// ancla #01

		// estas variables se guardan durante el evento mouse
		// mouseup para determinar si la posición en la que se
		// encuentra la burbuja al soltar el click es la misma
		// que cuando se empezó
		
		this.finalStaticalClientX = e.clientX;
		this.finalStaticalClientY = e.clientY;
		this.simulatedClick();
		// window.removeEventListener('mousemove', bpop.dragg.bind(this) );
	},
	setAside: function() {
		if (this.finalStaticalClientX < (window.innerWidth / 2)) {
			this.$draggable.style.left = '-3px';
		} else {
			this.$draggable.style.left = 'calc(100% - 67px)';
		}

		this.itIsActived = false;

		this.$draggable.style.transition = 'left 0.2s ease, transform 0.2s ease';
		setTimeout(function() {
			bpop.$draggable.style.transition = 'transform 0.2s ease';
		}, 200);
	},
	setAsideFromDefault: function() {
		this.$draggable.style.left = '-5px';
		this.$draggable.style.top = '20px';
		this.$mainContentWrapper.classList.add('minimized');
		this.itIsActived = false;
		this.$fadeBg.style.opacity = '0';
		setTimeout(function() {
			bpop.$fadeBg.parentElement.removeChild(bpop.$fadeBg);
		}, 200);
	},
	simulatedClick: function() {
		// checando la posicion para determinar
		// el evento click

		if (this.initialStaticalClientX == this.finalStaticalClientX && this.initialStaticalClientY == this.finalStaticalClientY) {
			if(this.itIsActived) {
				this.setAsideFromDefault();
			} else {
				this.displayContainer();
			}
		} else {
			if(this.itIsActived) {
				this.$fadeBg.style.opacity = '0';
				setTimeout(function() {
					bpop.$fadeBg.parentElement.removeChild(bpop.$fadeBg);
				}, 200);
			}
			
			this.setAside();
		}
	},
	bindListeners: function() {
		// añadiendo eventos para el dragado
		// de la burbuja
		this.$bubbleBody.addEventListener('mousedown', this.draggOn.bind(this) );
		this.$bubbleBody.addEventListener('mouseup', this.disableDragg.bind(this) );

		// evento para el fondo
		this.$bgFade.addEventListener('click', this.setAsideFromDefault.bind(this) );
	},
	renderDom: function() {
		// creando la burbuja
		// inicializada con la clase unactive para
		// que aparezca minimizada

		this.$bubbleBody = document.createElement('div');
		this.$bubbleBody.classList.add('bubble_default__bubble');
		this.$bubbleBody.setAttribute('id', 'floatingBubble');

		// creando la burbuja
		// inicializada con la clase unactive para
		// que aparezca minimizada

		this.$bubbleBodyContent = document.createElement('div');
		this.$bubbleBodyContent.classList.add('minimized');
		this.$bubbleBodyContent.classList.add('bubble_default__content');
		
		this.$bubbleBodyContentInternal = document.createElement('div');
		this.$bubbleBodyContentInternal.classList.add('bubble_default__internal');

		this.$bubbleBodyContent.appendChild(this.$bubbleBodyContentInternal);

		// Creando el contenedor para la burbuja y el container
		this.$bubbleBodyParent = document.createElement('section');
		this.$bubbleBodyParent.setAttribute('id', 'floatingBubbleContainer');
		
		//insertando la burbuja y el contenedor en el contenedor padre
		this.$bubbleBodyParent.appendChild(this.$bubbleBody);
		this.$bubbleBodyParent.appendChild(this.$bubbleBodyContent);

		// insertando el contenedor padre en el body
		document.querySelector('body').appendChild(this.$bubbleBodyParent);

		//linkeando stylesheet
		document.head.innerHTML = document.head.innerHTML + '<link rel="stylesheet" type="text/css" href="bpop.css">';

		// creando el fondo en fadeIn
		this.$bgFade = document.createElement('span');
		this.$bgFade.classList.add('bubble_default__bg');
	},
	cacheDom: function() {
		// cargando los elementos de DOM
		// contenedor principal
		this.$mainContentParent = document.querySelector('#floatingBubbleContainer');
		
		// contenedor información
		this.$mainContentWrapper = this.$mainContentParent.querySelector('.bubble_default__content');
		
		// burbuja
		this.$draggable = this.$mainContentParent.querySelector('.bubble_default__bubble');
	}
}

var bmod = {
	setContent: function(param) {
		this.$mainContentInternal.innerHTML = param + '<br><br>';
	},
	pushContent: function(param) {
		this.$mainContentInternal.innerHTML = this.$mainContentInternal.innerHTML + param + '<br><br>';
	},
	cacheDom: function() {
		this.$draggable = document.querySelector('.bubble_default__bubble');
		this.$mainContentWrapper = document.querySelector('.bubble_default__content');
		this.$mainContentInternal = document.querySelector('.bubble_default__internal');
	}
}