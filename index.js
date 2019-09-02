function menu(){
	let header = document.body.querySelector('.header');
	let div = header.querySelector('div');
	let nav = header.querySelector('nav');
	let check = true;
	let clone = document.createElement('div');

	function fixedPosition(){
		clone.style.height = nav.offsetHeight + 'px';
		clone.style.width = nav.offsetWidth + 'px';
		clone.style.backgroundColor = 'white';
		header.append(clone);

		nav.style.position = 'fixed';
		nav.style.top = 0 + 'px';
		nav.style.zIndex = 1000;
	}

	window.onload = function(){
		let coords = div.getBoundingClientRect();
		if(coords.bottom <= 0) {
			fixedPosition();
			check = false;
		}

		document.onscroll = function(){
			coords = div.getBoundingClientRect();

			if(coords.bottom <= 0 && check) {
				fixedPosition();
				check = false;
			}

			if(coords.bottom > 0 && !check) {
				clone.remove();
				nav.style.position = '';
				nav.style.top = '';
				nav.style.zIndex = '';
				check = true;
			}
		}
	}
}

function linkGroup(){
	let nav = document.querySelector('.link-group');
	let firstElem = nav.querySelectorAll('a')[0];
	let lastElem = firstElem;
	nav.onclick = function( event ) {
		let target = event.target;
		if(target.tagName == 'A'){
			event.preventDefault();
			if(!target.classList.contains('active')){
				target.classList.add('active');
				lastElem.classList.remove('active');
				lastElem = target;
			}
			let text = target.innerHTML;
			let titles = document.querySelector('.templates').querySelectorAll('h2');
			if(text == 'All'){
				titles.forEach( (item) => {item.closest('figure').classList.remove('visibility')});
				//document.querySelector('.templates').style.justifyContent = 'center';
			}
			else {
				//document.querySelector('.templates').style.justifyContent = 'flex-start';
				for(let title of titles) {
					if(title.innerHTML != text) title.closest('figure').classList.add('visibility');
					else title.closest('figure').classList.remove('visibility');
				}
			}
		}
	}
}

function mainNavigation(){
	let nav = document.querySelector('.mainNavBar');
	nav.onclick = function(event) {
		if(event.target.tagName == "A") {
			if(event.target.innerHTML == 'home') window.scrollTo(0, 0);
			else{
				event.preventDefault();
				let elem = document.querySelector(`.${event.target.innerHTML}`);
				let coords = elem.getBoundingClientRect();
				window.scrollTo(0, coords.top + pageYOffset - nav.offsetHeight);
			}
		}
	}
}

function submit() {
	let form = document.forms.formMessage;
	form.onsubmit = function (event){
		event.preventDefault();
		if(this.elements.name.value.length < 4) this.elements.name.nextElementSibling.classList.remove('visibility');
		else this.elements.name.nextElementSibling.classList.add('visibility');

		if(!this.elements.email.value.length) this.elements.email.nextElementSibling.classList.remove('visibility');
		else this.elements.email.nextElementSibling.classList.add('visibility');

		if(this.elements.subject.value.length < 8) this.elements.subject.nextElementSibling.classList.remove('visibility');
		else this.elements.subject.nextElementSibling.classList.add('visibility');

		if(!this.elements.message.value.length) this.elements.message.nextElementSibling.classList.remove('visibility');
		else this.elements.message.nextElementSibling.classList.add('visibility');
	}
}

submit();
mainNavigation();
linkGroup();
menu();
