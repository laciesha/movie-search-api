class Movie extends HTMLElement {
    constructor() {
      super();
    }

    //overriding the connected callback method with my own html
    connectedCallback(){
        this.innerHTML = `
        <p>${this.getAttribute("title")}</p>
        <p>${this.getAttribute("year")}</p>
        
        
        `;
        
    }
  }

  //custome-elem
  customElements.define('movie-display', Movie);
