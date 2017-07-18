   /////////////////////////////////////
  // burbuja flotante         -v 0.1 //
 // z-index: 999                    //
/////////////////////////////////////
	
var bpop = {
	// 	initializing bubble
	init: function() {
		this.renderDom();
		this.cacheDom();
		this.bindListeners();
		this.itIsActived = false;
	},
	kill: function() {
		this.$parentNode = this.$mainContentParent.parentNode;
		this.$parentNode.removeChild(this.$mainContentParent);
	},
	displayContainer: function() {
		this.itIsOpen = true;
		this.$draggable.style.transition = 'left 0.2s ease, top 0.2s ease, transform 0.2s ease';
		this.$draggable.style.left = '5px';
		this.$draggable.style.top = '5px';

		// rendering fade background
		this.$mainContentParent.appendChild(this.$bgFade);
		setTimeout(function() {
			bpop.$draggable.style.transition = 'transform 0.2s ease';
			bpop.$mainContentWrapper.classList.remove('minimized')
			bpop.itIsActived = true;
		}, 200);

		// getting background in cache
		this.$fadeBg = this.$mainContentParent.querySelector('.bubble_default__bg');
		this.$fadeBg.style.opacity = '1';
	},
	dragg: function(e) {

		/*
		* this.draggActives 
		* Determines if it is time for the bubble to follow the mouse position
		* 
		* reference a true #02
		* reference a false #03
		*/

		if (this.draggActives) {
			this.x = e.clientX;
			this.y = e.clientY;
			
			this.$draggable.style.left = (this.x - 35) + 'px';
			this.$draggable.style.top = (this.y - 35)  + 'px';

			this.$mainContentWrapper.classList.add('minimized');
		}
	},
	draggOn: function(e) {
		// Activating dragg
		// anchor #02
		this.draggActives = true;

		// reference #01
		this.initialStaticalClientX = e.clientX;
		this.initialStaticalClientY = e.clientY;

		// binding for the dragg event
		window.addEventListener('mousemove', bpop.dragg.bind(this) );
	},
	disableDragg: function(e) {
		// anchor #03
		this.draggActives = false;
		
		// anchor #01

		/*
		* estas variables se guardan durante el evento mouse
		* mouseup para determinar si la posición en la que se
		* encuentra la burbuja al soltar el click es la misma
		* que cuando se empezó
		*/

		/*
		* These variables are saved during mouseup event
		* for know if the bubble position It is the same
		* as in the beginning
		*/
		
		this.finalStaticalClientX = e.clientX;
		this.finalStaticalClientY = e.clientY;
		this.simulatedClick();
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
		/*
		* checking the bubble position
		* handling initial position and
		* final position for simulate a
		* click event
		*/

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
		
		// binding event for dragg
		// from bubble
		this.$bubbleBody.addEventListener('mousedown', this.draggOn.bind(this) );
		this.$bubbleBody.addEventListener('mouseup', this.disableDragg.bind(this) );

		// binding fade bg event
		this.$bgFade.addEventListener('click', this.setAsideFromDefault.bind(this) );
	},
	renderDom: function() {
		// creating bubble

		this.$bubbleBody = document.createElement('div');
		this.$bubbleBody.classList.add('bubble_default__bubble');
		this.$bubbleBody.setAttribute('id', 'floatingBubble');

		// creating wrapper

		this.$bubbleBodyContent = document.createElement('div');
		this.$bubbleBodyContent.classList.add('minimized');
		this.$bubbleBodyContent.classList.add('bubble_default__content');
		
		this.$bubbleBodyContentInternal = document.createElement('div');
		this.$bubbleBodyContentInternal.classList.add('bubble_default__internal');
		this.$bubbleBodyContentInternal.setAttribute('id', 'bpop');

		this.$bubbleBodyContent.appendChild(this.$bubbleBodyContentInternal);

		// creating main parent for all framework
		this.$bubbleBodyParent = document.createElement('section');
		this.$bubbleBodyParent.setAttribute('id', 'floatingBubbleContainer');
		
		// setting the bubble and wrapper inside of main parent
		this.$bubbleBodyParent.appendChild(this.$bubbleBody);
		this.$bubbleBodyParent.appendChild(this.$bubbleBodyContent);

		// setting main parent on body tag
		document.querySelector('body').appendChild(this.$bubbleBodyParent);

		// linking stylesheet
		document.head.innerHTML = document.head.innerHTML + '<link rel="stylesheet" type="text/css" href="bpop.css">';

		// creating fade background
		this.$bgFade = document.createElement('span');
		this.$bgFade.classList.add('bubble_default__bg');
	},
	cacheDom: function() {
		// caching elements from DOM
		// caching main container
		this.$mainContentParent = document.querySelector('#floatingBubbleContainer');
		
		// caching wrapper información
		this.$mainContentWrapper = this.$mainContentParent.querySelector('.bubble_default__content');
		
		// caching bubble
		this.$draggable = this.$mainContentParent.querySelector('.bubble_default__bubble');
	}
}

bpop.init();