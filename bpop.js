   /////////////////////////////////////
  // burbuja flotante         -v 0.1 //
 // z-index: 999                    //
/////////////////////////////////////

// checking for mobile devices
// code from http://blog.alejandromolero.com/detectar-si-es-un-smartphone-o-tablet-mediante-javascript-y-jquery/
const Mobile = {
	check(){
		return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4)))
	}
}
const isMobile = Mobile.check();

let bpop = {
	// 	initializing bubble
	init(param) {
		if (param.autoRender == true) { this.renderDom(); }
		this.cacheDom();
		this.bindListeners();
		this.itIsActived = false;
	},
	kill() {
		this.$parentNode = this.$mainContentParent.parentNode;
		this.$parentNode.removeChild(this.$mainContentParent);
	},
	displayContainer() {
		this.itIsOpen = true;
		this.$draggable.style.transition = 'left 0.2s ease, top 0.2s ease, transform 0.2s ease';
		this.$draggable.style.left = '5px';
		this.$draggable.style.top = '5px';

		// rendering fade background
		this.$mainContentParent.appendChild(this.$bgFade);
		setTimeout(() => {
			this.$draggable.style.transition = 'transform 0.2s ease';
			this.$mainContentWrapper.classList.remove('minimized')
			this.itIsActived = true;
		}, 200);

		// caching fade background
		this.$fadeBg = this.$mainContentParent.querySelector('.bubble_default__bg');
		this.$fadeBg.style.opacity = '1';
	},
	dragg(e) {

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
	draggOn(e) {
		// Activating dragg
		// anchor #02
		this.draggActives = true;

		// reference #01
		this.initialStaticalClientX = e.clientX;
		this.initialStaticalClientY = e.clientY;

		// binding for the dragg event
		window.addEventListener('mousemove', bpop.dragg.bind(this) );
	},
	disableDragg(e) {
		// anchor #03
		this.draggActives = false;

		// anchor #01

		/*
		* These variables are saved during mouseup event
		* for know if the bubble position It is the same
		* as in the beginning
		*/

		this.finalStaticalClientX = e.clientX;
		this.finalStaticalClientY = e.clientY;
		this.simulatedClick();
	},
	setAside() {
		if (this.finalStaticalClientX < (window.innerWidth / 2)) {
			this.$draggable.style.left = '-3px';
		} else {
			this.$draggable.style.left = 'calc(100% - 67px)';
		}

		this.itIsActived = false;

		this.$draggable.style.transition = 'left 0.2s ease, transform 0.2s ease';
		setTimeout(() => {
			this.$draggable.style.transition = 'transform 0.2s ease';
		}, 200);
	},
	setAsideFromDefault() {
		if (isMobile) {
			this.$draggable.style.left = 'calc(100% - 90px)';
			this.$draggable.style.top = 'calc(100% - 90px)';
		} else {
			this.$draggable.style.left = '-5px';
			this.$draggable.style.top = '20px';
		}

		this.$draggable.style.transition = '0.2s ease';

		this.$mainContentWrapper.classList.add('minimized');
		this.itIsActived = false;
		this.$fadeBg.style.opacity = '0';
		setTimeout(() => {
			this.$draggable.style.transition = 'none';
			this.$fadeBg.parentElement.removeChild(bpop.$fadeBg);
		}, 200);
	},
	simulatedClick() {
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
				setTimeout(() => {
					bpop.$fadeBg.parentElement.removeChild(bpop.$fadeBg);
				}, 200);
			}

			this.setAside();
		}
	},
	bindListeners() {
		// binding event for dragg
		// from bubble
		this.$bubbleBody.addEventListener('mousedown', this.draggOn.bind(this) );
		this.$bubbleBody.addEventListener('mouseup', this.disableDragg.bind(this) );

		// binding fade bg event
		this.$bgFade.addEventListener('click', this.setAsideFromDefault.bind(this) );
	},
	renderDom() {
		// creating bubble

		this.$bubbleBody = document.createElement('div');
		this.$bubbleBody.classList.add('bubble_default__bubble');
		this.$bubbleBody.setAttribute('id', 'floatingBubble');

		if(isMobile) {
			this.$bubbleBody.setAttribute('style', 'left: calc(100% - 90px); top: calc(100% - 90px); top');
		}

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
		document.body.appendChild(this.$bubbleBodyParent);

		// linking stylesheet
		// document.head.innerHTML = document.head.innerHTML + '<link rel="stylesheet" type="text/css" href="https://codepen.io/e1016/pen/awrWQg.css">';

		// creating fade background
		this.$bgFade = document.createElement('span');
		this.$bgFade.classList.add('bubble_default__bg');
	},
	cacheDom() {
		// caching elements from DOM
		// caching main container
		this.$mainContentParent = document.querySelector('#floatingBubbleContainer');

		// caching wrapper información
		this.$mainContentWrapper = this.$mainContentParent.querySelector('.bubble_default__content');

		// caching bubble
		this.$draggable = this.$mainContentParent.querySelector('.bubble_default__bubble');
	}

};
