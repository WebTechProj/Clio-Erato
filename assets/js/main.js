// already present functions from Bootstrap template

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });
  
  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

})()

//flags to control if the highlight functions are active, and if they are, they stay active even when other
//functions are called, such as the ones for showing and hiding the second language of the poems:
//a flag is set true when the corresponding highlighting function is called and set false when 
//the function to remove the corresponding highlight is called.

var selfflag=false;
var bodyflag=false;
var placeflag=false;
var negflag=false;
var posflag=false;

//functions to show poems on click on title button

function showHome() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showHomeIt()">Show Italian</button>
  </div>
  <br><br>
  <h3>Untitled (from <i>home body</i>)</h3>
  <p>
    <span class="self">our</span> souls<br>
    will not be <span class="pos">soothed</span><br>
    by what <span class="self">we</span> <span class="pos">achieve</span><br>
    how <span class="self">we</span> look<br>
    or all the hard work <span class="self">we</span> do<br>
    even if <span class="self">we</span> managed to<br>
    make all the money in the <span class="place">world</span><br>
    <span class="self">we</span>’d be left feeling <span class="neg">empty</span> for something<br>
    <span class="self">our</span> souls <span class="neg">ache</span> for community<br>
    <span class="self">our</span> deepest being craves one another<br>
    <span class="self">we</span> need to be connected<br>
    to feel <span class="pos">alive</span><br>
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showHomeIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showHome()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>Untitled (from <i>home body</i>)</h3>
    <p>
      <span class="self">our</span> souls<br>
      will not be <span class="pos">soothed</span><br>
      by what <span class="self">we</span> <span class="pos">achieve</span><br>
      how <span class="self">we</span> look<br>
      or all the hard work <span class="self">we</span> do<br>
      even if <span class="self">we</span> managed to<br>
      make all the money in the <span class="place">world</span><br>
      <span class="self">we</span>’d be left feeling <span class="neg">empty</span> for something<br>
      <span class="self">our</span> souls <span class="neg">ache</span> for community<br>
      <span class="self">our</span> deepest being craves one another<br>
      <span class="self">we</span> need to be connected<br>
      to feel <span class="pos">alive</span><br>
    </p>
  </div>
  <div id="secondLanguage">
    <h3>Senza titolo (da <i>home body</i>)</h3>
    <p>
      le nostre anime<br>
      non troveranno sollievo<br>
      nei nostri successi<br>
      nel nostro aspetto<br>
      né in tutto il nostro duro lavoro<br>
      quand’anche guadagnassimo<br>
      tutto il denaro del mondo<br>
      ci sentiremmo sempre vuoti per qualcosa<br>
      le nostre anime hanno smania di comunità<br>
      le nostre quintessenze si bramano a vicenda<br>
      abbiamo bisogno di essere collegati<br>
      di sentirci vivi<br>  
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showHate() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showHateIt()">Show Italian</button>
  </div>
  <br><br>
  <h3>self-hate</h3>
  <p>
    <span class="place">somewhere</span> along the <span class="place">way</span><br>
    <span class="self">i</span> <span class="neg">lost</span> the <span class="self">self</span>-<span class="pos">love</span><br>
    and became <span class="self">my</span> greatest <span class="neg">enemy</span><br>
    <span class="self">i</span> thought <span class="self">i</span>’d seen the <span class="neg">devil</span> before<br>
    in the uncles who touched <span class="self">us</span> as children<br>
    the mobs that burned <span class="self">our</span> <span class="place">city</span> to the ground<br>
    but <span class="self">i</span>’d never seen someone as <span class="neg">hungry</span><br>
    for <span class="self">my</span> <span class="body">flesh</span> as <span class="self">i</span> was<br>
    <span class="self">i</span> peeled <span class="self">my</span> <span class="body">skin</span> off just to feel awake<br>
    wore it inside out<br>
    sprinkled it with salt to <span class="neg">punish</span> <span class="self">myself</span><br>
    <span class="neg">turmoil clotted</span> <span class="self">my</span> <span class="body">nerves</span><br>
    <span class="self">my</span> <span class="body">blood</span> <span class="neg">curdled</span><br>
    <span class="self">i</span> even tried to <span class="neg">bury</span> <span class="self">myself</span> <span class="pos">alive</span><br>
    but the <span class="neg">dirt</span> recoiled<br>
    you have already <span class="neg">rotted</span> it said<br>
    there is nothing left for me to do<br>
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showHateIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showHate()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>self-hate</h3>
    <p>
      <span class="place">somewhere</span> along the <span class="place">way</span><br>
      <span class="self">i</span> <span class="neg">lost</span> the <span class="self">self</span>-<span class="pos">love</span><br>
      and became <span class="self">my</span> greatest <span class="neg">enemy</span><br>
      <span class="self">i</span> thought <span class="self">i</span>’d seen the <span class="neg">devil</span> before<br>
      in the uncles who touched <span class="self">us</span> as children<br>
      the mobs that burned <span class="self">our</span> <span class="place">city</span> to the ground<br>
      but <span class="self">i</span>’d never seen someone as <span class="neg">hungry</span><br>
      for <span class="self">my</span> <span class="body">flesh</span> as <span class="self">i</span> was<br>
      <span class="self">i</span> peeled <span class="self">my</span> <span class="body">skin</span> off just to feel awake<br>
      wore it inside out<br>
      sprinkled it with salt to <span class="neg">punish</span> <span class="self">myself</span><br>
      <span class="neg">turmoil clotted</span> <span class="self">my</span> <span class="body">nerves</span><br>
      <span class="self">my</span> <span class="body">blood</span> <span class="neg">curdled</span><br>
      <span class="self">i</span> even tried to <span class="neg">bury</span> <span class="self">myself</span> <span class="pos">alive</span><br>
      but the <span class="neg">dirt</span> recoiled<br>
      you have already <span class="neg">rotted</span> it said<br>
      there is nothing left for me to do<br>
    </p>
  </div>
  <div id="secondLanguage">
    <h3>autoodio</h3>
    <p>
      in un punto imprecisato del cammino<br>
      ho perso l’autoamore<br>
      e sono diventata mia acerrima nemica <br>
      credevo di aver già visto il diavolo<br>
      negli zii che ci toccavano da bambine<br>
      nelle folle che incenerivano la nostra città<br>
      ma non avevo mai visto nessuno <br>
      così affamato<br>
      come me della mia carne<br>
      mi levavo la pelle solo per sentirmi viva<br>
      la indossavo al rovescio<br>
      cosparsa di sale per punirmi<br>
      il tumulto m’intasava i nervi<br>
      il mio sangue si rapprendeva<br>
      ho addirittura provato a seppellirmi viva<br>
      ma la terra si è ritratta<br>
      <i>sei già putrefatta così</i> ha detto<br>
      <i>non occorre che io faccia alcunché</i>
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showMilk() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showMilkIt()">Show Italian</button>
  </div>
  <br><br>
  <h3>Untitled (from <i>milk and honey</i>)</h3>
  <p>
    did you think <span class="self">i</span> was a <span class="place">city</span><br>
    big enough for a weekend getaway<br>
    <span class="self">i</span> am the <span class="place">town</span> surrounding it<br>
    the one you’ve never heard of<br>
    but always pass through<br>
    there are no neon lights <span class="place">here</span><br>
    no skyscrapers or statues<br>
    but there is thunder<br>
    for <span class="self">i</span> make bridges tremble<br>
    <span class="self">i</span> am not street meat <span class="self">i</span> am homemade jam<br>
    <span class="self">i</span> am the crackle of a fireplace <br>
    <span class="self">i</span>’d burn you and you still<br>
    couldn’t take your <span class="body">eyes</span> off <span class="self">me</span><br>
    cause <span class="self">i</span>’d look so <span class="pos">beautiful</span> doing it<br>
    you’d blush<br>
    <span class="self">i</span> am not a <span class="place">hotel room</span> <span class="self">i</span> am <span class="place">home</span><br>
    <span class="self">i</span> am not the whiskey you want<br>
    <span class="self">i</span> am the water you need<br>
    don’t come <span class="place">here</span> with expectations<br>
    and try to make a vacation out of <span class="self">me</span>
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showMilkIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showMilk()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>Untitled (from <i>milk and honey</i>)</h3>
    <p>
      did you think <span class="self">i</span> was a <span class="place">city</span><br>
      big enough for a weekend getaway<br>
      <span class="self">i</span> am the <span class="place">town</span> surrounding it<br>
      the one you’ve never heard of<br>
      but always pass through<br>
      there are no neon lights <span class="place">here</span><br>
      no skyscrapers or statues<br>
      but there is thunder<br>
      for <span class="self">i</span> make bridges tremble<br>
      <span class="self">i</span> am not street meat <span class="self">i</span> am homemade jam<br>
      <span class="self">i</span> am the crackle of a fireplace <br>
      <span class="self">i</span>’d burn you and you still<br>
      couldn’t take your <span class="body">eyes</span> off <span class="self">me</span><br>
      cause <span class="self">i</span>’d look so <span class="pos">beautiful</span> doing it<br>
      you’d blush<br>
      <span class="self">i</span> am not a <span class="place">hotel room</span> <span class="self">i</span> am <span class="place">home</span><br>
      <span class="self">i</span> am not the whiskey you want<br>
      <span class="self">i</span> am the water you need<br>
      don’t come <span class="place">here</span> with expectations<br>
      and try to make a vacation out of <span class="self">me</span>
    </p>
  </div>
  <div id="secondLanguage">
    <h3>Senza titolo (da <i>milk and honey</i>)</h3>
    <p>
      mi avevi forse presa per una città<br>
      abbastanza grade per una gita di un weekend<br>
      io sono il sobborgo<br>
      che tu non hai mai sentito nominare<br>
      ma che attraversi sempre<br>
      non ci sono insegne al neon<br>
      niente grattacieli né statue<br>
      però c’è il tuono<br>
      perché io faccio tremare i ponti<br>
      non sono l’hot dog del baracchino ma confettura artigianale<br>
      tanto densa da incidere la cosa<br>
      più dolce che le tue labbra tocchino<br>
      non sono le sirene della polizia<br>
      sono lo scoppiettio di un camino<br>
      ti brucerei eppure tu<br>
      non sapresti distogliere lo sguardo da me<br>
      perché nel farlo sarei talmente bella <br>
      che arrossiresti<br>
      non sono una camera d’albergo sono una casa<br>
      non sono il whiskey che tu vuoi<br>
      sono l’acqua che ti serve<br>
      non avanzare pretese<br>
      e non provare a fare di me una vacanza    
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showOde() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showOdeGre()">Show Greek</button>
  </div>
  <br><br>
  <h3>Ode to Aphrodite</h3>
  <p>
    On the throne of many hues, <span class="pos">Immortal</span> Aphrodite,<br>
    child of Zeus, weaving wiles: <span class="self">I</span> beg you,<br>
    do not break <span class="self">my</span> spirit, O <span class="pos">Queen</span>,<br>
    with <span class="neg">pain</span> or <span class="neg">sorrow</span><br><br>
    but come – if ever before from <span class="place">far away</span><br>
    you heard <span class="self">my</span> voice and listened,<br>
    and leaving your father’s<br>
    <span class="place">golden home</span> you came,<br><br>
    your chariot yoked with <span class="pos">lovely</span> sparrows<br>
    drawing you quickly over the <span class="neg">dark</span> earth<br>
    in a whirling cloud of wings down<br>
    the <span class="place">sky</span> through midair,<br><br>
    suddenly <span class="place">here</span>. <span class="pos">Blessed</span> One, with a <span class="pos">smile</span><br>
    on your <span class="pos">deathless</span> <span class="body">face</span>, you ask<br>
    what have <span class="self">I</span> <span class="neg">suffered</span> again<br><br>
    and why do <span class="self">I</span> call again<br>
    and what in <span class="self">my</span> wild <span class="body">heart</span> do <span class="self">I</span> most wish<br>
    would happen: “Once again who must <span class="self">I</span><br>
    persuade to turn back to your <span class="pos">love</span>?<br>
    <span class="self">Sappho</span>, who <span class="neg">wrongs</span> you?<br>
    If now she flees, soon she’ll chase.<br>
    If <span class="neg">rejecting</span> gifts, then she’ll give.<br>
    If <span class="neg">not loving</span>, soon she’ll <span class="pos">love</span><br>
    even against her will.”<br><br>
    Come to <span class="self">me</span> now – release <span class="self">me</span> from these <span class="neg">troubles</span>, everything <span class="self">my</span> <span class="body">heart</span> longs<br>
    to have <span class="pos">fulfilled</span>, <span class="pos">fulfill</span>, and you<br>
    be <span class="self">my</span> <span class="pos">ally</span>.
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}  

function showOdeGre(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showOde()">Hide Greek</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>Ode to Aphrodite</h3>
    <p>
      On the throne of many hues, <span class="pos">Immortal</span> Aphrodite,<br>
      child of Zeus, weaving wiles: <span class="self">I</span> beg you,<br>
      do not break <span class="self">my</span> spirit, O <span class="pos">Queen</span>,<br>
      with <span class="neg">pain</span> or <span class="neg">sorrow</span><br><br>
      but come – if ever before from <span class="place">far away</span><br>
      you heard <span class="self">my</span> voice and listened,<br>
      and leaving your father’s<br>
      <span class="place">golden home</span> you came,<br><br>
      your chariot yoked with <span class="pos">lovely</span> sparrows<br>
      drawing you quickly over the <span class="neg">dark</span> earth<br>
      in a whirling cloud of wings down<br>
      the <span class="place">sky</span> through midair,<br><br>
      suddenly <span class="place">here</span>. <span class="pos">Blessed</span> One, with a <span class="pos">smile</span><br>
      on your <span class="pos">deathless</span> <span class="body">face</span>, you ask<br>
      what have <span class="self">I</span> <span class="neg">suffered</span> again<br><br>
      and why do <span class="self">I</span> call again<br>
      and what in <span class="self">my</span> wild <span class="body">heart</span> do <span class="self">I</span> most wish<br>
      would happen: “Once again who must <span class="self">I</span><br>
      persuade to turn back to your <span class="pos">love</span>?<br>
      <span class="self">Sappho</span>, who <span class="neg">wrongs</span> you?<br>
      If now she flees, soon she’ll chase.<br>
      If <span class="neg">rejecting</span> gifts, then she’ll give.<br>
      If <span class="neg">not loving</span>, soon she’ll <span class="pos">love</span><br>
      even against her will.”<br><br>
      Come to <span class="self">me</span> now – release <span class="self">me</span> from these <span class="neg">troubles</span>, everything <span class="self">my</span> <span class="body">heart</span> longs<br>
      to have <span class="pos">fulfilled</span>, <span class="pos">fulfill</span>, and you<br>
      be <span class="self">my</span> <span class="pos">ally</span>.
    </p>
  </div>
  <div id="secondLanguage">
    <h3>Insert greek title</h3>
    <p>
      «ποικιλόθρον' ἀθανάτ' Αφρόδιτα,<br>
      παῖ Δίος δολόπλοκε, λίσσομαί σε,<br>
      μή μ' ἄσαισι μηδ' ὀνίαισι δάμνα,<br>
      πότνια, θῦμον,<br><br>
      ἀλλὰ τυίδ' ἔλθ', αἴ ποτα κἀτέρωτα<br>
      τὰς ἔμας αὔδας ἀίοισα πήλοι<br>
      ἔκλυες, πάτρος δὲ δόμον λίποισα<br>
      χρύσιον ἦλθες<br><br>
      ἄρμ' ὐπασδεύξαισα, κάλοι δέ σ' ἆγον<br>
      ὤκεες στροῦθοι περὶ γᾶς μελαίνας<br>
      πύπνα δίννεντες πτέρ' ἀπ' ὠράνωἴθε-<br>
      ρος διὰ μέσσω.<br><br>
      αἶψα δ' ἐξίκοντο, σὺ δ', ὦ μάκαιρα,<br>
      μειδιαίσαισ' ἀθανάτωι προσώπωι<br>
      ἤρε' ὄττι δηὖτε πέπονθα κὤττι<br>
      δηὖτε κάλημμι<br><br>
      κὤττι μοι μάλιστα θέλω γένεσθαι<br>
      μαινόλαι θύμωι. τίνα δηὖτε πείθω<br>
      ἄψ σ' ἄγην ἐς σὰν φιλότατα;τίς σ', ὦ<br>
      Ψάπφ', ἀδικήει;<br><br>
      καὶ γὰρ αἰ φεύγει, ταχέως διώξει,<br>
      αἰ δὲ δῶρα μὴ δέκετ',ἀλλὰ δώσει,<br>
      αἰ δὲ μὴ φίλει, ταχέως φιλήσει<br>
      κωὐκ ἐθέλοισα.<br><br>
      ἔλθε μοι καὶ νῦν, χαλέπαν δὲ λῦσον<br>
      ἐκ μερίμναν, ὄσσα δέ μοι τέλεσσαι<br>
      θῦμος ἰμέρρει, τέλεσον,σὺ δ' αὔτα<br>
      σύμμαχος ἔσσο.»
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showSappho() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showSapphoGre()">Show Greek</button>
  </div>
  <br><br>
  <h3>Sappho 31</h3>
  <p>
    That man seems to <span class="self">me</span> to be equal to the <span class="pos">gods</span><br>
    who is sitting opposite you<br>
    and hears you nearby<br>
    speaking <span class="pos">sweetly</span><br><br>
    and <span class="pos">laughing delightfully</span>, which indeed<br>
    makes <span class="self">my</span> <span class="body">heart</span> flutter in <span class="self">my</span> <span class="body">breast</span>;<br>
    for when <span class="self">I</span> look at you even for a short time,<br>
    it is no longer possible for <span class="self">me</span> to speak<br><br>
    but it is as if <span class="self">my</span> <span class="body">tongue</span> is <span class="neg">broken</span><br>
    and immediately a subtle fire has run over <span class="self">my</span> <span class="body">skin</span>,<br>
    <span class="self">I</span> cannot see anything with <span class="self">my</span> <span class="body">eyes</span>,<br>
    and <span class="self">my</span> <span class="body">ears</span> are buzzing<br><br>
    a cold sweat comes over <span class="self">me</span>, trembling<br>
    seizes <span class="self">me</span> all over, <span class="self">I</span> am paler<br>
    than grass, and <span class="self">I</span> seem nearly<br>
    to have <span class="neg">died</span>.<br><br>
    but everything must be dared/endured, since<br>
    (?even a <span class="neg">poor</span> man) ...
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}  

function showSapphoGre(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showSappho()">Hide Greek</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>Sappho 31</h3>
    <p>
      That man seems to <span class="self">me</span> to be equal to the <span class="pos">gods</span><br>
      who is sitting opposite you<br>
      and hears you nearby<br>
      speaking <span class="pos">sweetly</span><br><br>
      and <span class="pos">laughing delightfully</span>, which indeed<br>
      makes <span class="self">my</span> <span class="body">heart</span> flutter in <span class="self">my</span> <span class="body">breast</span>;<br>
      for when <span class="self">I</span> look at you even for a short time,<br>
      it is no longer possible for <span class="self">me</span> to speak<br><br>
      but it is as if <span class="self">my</span> <span class="body">tongue</span> is <span class="neg">broken</span><br>
      and immediately a subtle fire has run over <span class="self">my</span> <span class="body">skin</span>,<br>
      <span class="self">I</span> cannot see anything with <span class="self">my</span> <span class="body">eyes</span>,<br>
      and <span class="self">my</span> <span class="body">ears</span> are buzzing<br><br>
      a cold sweat comes over <span class="self">me</span>, trembling<br>
      seizes <span class="self">me</span> all over, <span class="self">I</span> am paler<br>
      than grass, and <span class="self">I</span> seem nearly<br>
      to have <span class="neg">died</span>.<br><br>
      but everything must be dared/endured, since<br>
      (?even a <span class="neg">poor</span> man) ...
    </p>
  </div>
  <div id="secondLanguage">
    <h3>Insert greek title</h3>
    <p>
      φαίνεταί μοι κῆνος ἴσος θέοισιν<br>
      ἔμμεν᾽ ὤνηρ, ὄττις ἐνάντιός τοι<br>
      ἰσδάνει καὶ πλάσιον ἆδυ φωνεί-<br>
      σας ὐπακούει<br><br>
      καὶ γελαίσας ἰμέροεν, τό μ᾽ ἦ μὰν<br>
      καρδίαν ἐν στήθεσιν ἐπτόαισεν·<br>
      ὠς γὰρ ἔς σ᾽ ἴδω βρόχε᾽, ὤς με φώναι-<br>
      σ᾽ οὐδ᾽ ἒν ἔτ᾽ εἴκει,<br><br>
      ἀλλ᾽ ἄκαν μὲν γλῶσσα †ἔαγε†, λέπτον<br>
      δ᾽ αὔτικα χρῶι πῦρ ὐπαδεδρόμηκεν,<br>
      ὀππάτεσσι δ᾽ οὐδ᾽ ἒν ὄρημμ᾽, ἐπιρρόμ-<br>
      βεισι δ᾽ ἄκουαι,<br><br>
      †έκαδε μ᾽ ἴδρως ψῦχρος κακχέεται†, τρόμος δὲ<br>
      παῖσαν ἄγρει, χλωροτέρα δὲ ποίας<br>
      ἔμμι, τεθνάκην δ᾽ ὀλίγω ᾽πιδεύης<br>
      φαίνομ᾽ ἔμ᾽ αὔται·<br><br>
      ἀλλὰ πὰν τόλματον ἐπεὶ †καὶ<br>
      πένητα†
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showMidnight() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showMidGre()">Show Greek</button>
  </div>
  <br><br>
  <h3>Midnight poem</h3>
  <p>
    The moon and the Pleiades have set,<br>
    it is midnight,<br>
    time is passing,<br>
    but <span class="self">I</span> sleep alone.
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}  

function showMidGre(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showMidnight()">Hide Greek</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>Midnight poem</h3>
    <p>
      The moon and the Pleiades have set,<br>
      it is midnight,<br>
      time is passing,<br>
      but <span class="self">I</span> sleep alone.
    </p>
  </div>
  <div id="secondLanguage">
    <h3>Insert greek title</h3>
    <p>
      Δέδυκε μὲν ἀ σελάννα<br>
      καὶ Πληΐαδες, μέσαι δέ<br>
      νύκτες, πάρα δ' ἔρχετ' ὤρα,<br>
      ἔγω δὲ μόνα κατεύδω.
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showSlant() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showSlantIt()">Show Italian</button>
  </div>
  <br><br>
  <h3>There’s a Certain Slant of Light</h3>
  <p>
    There's a certain Slant of <span class="pos">light</span>,<br>
    Winter Afternoons -<br>
    That <span class="neg">oppresses</span>, like the Heft<br>
    Of <span class="place">Cathedral</span> Tunes -<br><br>
    <span class="pos">Heavenly</span> <span class="neg">Hurt</span>, it gives <span class="self">us</span> -<br>
    <span class="self">We</span> can find no <span class="body">scar</span>,<br>
    But internal difference,<br>
    Where the Meanings, are -<br><br>
    None may teach it - Any -<br>
    'Tis the Seal Despair -<br>
    An <span class="pos">imperial</span> <span class="neg">Affliction</span><br>
    Sent <span class="self">us</span> of the Air -<br><br>
    When it comes, the <span class="place">Landscape</span> listens -<br>
    Shadows - hold their breath -<br>
    When it goes, 'tis like the Distance<br>
    On the <span class="body">look</span> of <span class="neg">Death</span> -
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
} 

function showSlantIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showSlant()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>There’s a Certain Slant of Light</h3>
    <p>
      There's a certain Slant of <span class="pos">light</span>,<br>
      Winter Afternoons -<br>
      That <span class="neg">oppresses</span>, like the Heft<br>
      Of <span class="place">Cathedral</span> Tunes -<br><br>
      <span class="pos">Heavenly</span> <span class="neg">Hurt</span>, it gives <span class="self">us</span> -<br>
      <span class="self">We</span> can find no <span class="body">scar</span>,<br>
      But internal difference,<br>
      Where the Meanings, are -<br><br>
      None may teach it - Any -<br>
      'Tis the Seal Despair -<br>
      An <span class="pos">imperial</span> <span class="neg">Affliction</span><br>
      Sent <span class="self">us</span> of the Air -<br><br>
      When it comes, the <span class="place">Landscape</span> listens -<br>
      Shadows - hold their breath -<br>
      When it goes, 'tis like the Distance<br>
      On the <span class="body">look</span> of <span class="neg">Death</span> -
    </p>
  </div>
  <div id="secondLanguage">
    <h3>V'è un angolo di luce</h3>
    <p>
      V'è un angolo di luce,<br>
      nei meriggi invernali<br>
      che opprime come la musica<br>
      d’austere cattedrali.<br><br>
      Una celeste piaga<br>
      ci dà, senz’altro segno<br>
      che il tramutarsi intimo<br>
      d’ogni significato.<br><br>
      Insegnarla è impossibile -<br>
      il suggello è l’angoscia,<br>
      imperiale afflizione<br>
      discesa a noi dall’aria<br><br>
      Quando viene, il paesaggio<br>
      ascolta, fino l’ombre<br>
      trattengono il respiro.<br>
      E quando va, somiglia alla distanza<br>
      sul volto della morte.
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showGrass() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showGrassIt()">Show Italian</button>
  </div>
  <br><br>
  <h3>The Grass so little has to do</h3>
  <p>
    The Grass so little has to do -<br>
    A Sphere of simple Green -<br>
    With only Butterflies to brood<br>
    And Bees to entertain -<br><br>
    And stir all day to <span class="pos">pretty</span> Tunes<br>
    The Breezes fetch along -<br>
    And hold the <span class="pos">Sunshine</span> in it's <span class="body">lap</span><br>
    And bow to everything -<br><br>
    And thread the Dews, all night, like <span class="pos">Pearls</span> -<br>
    And make itself so <span class="pos">fine</span><br>
    A Duchess were too common<br>
    For such a noticing -<br><br>
    And even when it <span class="neg">dies</span> - to pass<br>
    In Odors so <span class="pos">divine</span> -<br>
    Like <span class="pos">Lowly</span> spices, lain to sleep -<br>
    Or Amulates of Pine -<br><br>
    And then, in <span class="pos">Sovreign</span> <span class="place">Barns</span> to dwell -<br>
    And <span class="pos">dream</span> the Days away,<br>
    The Grass so little has to do<br>
    <span class="self">I</span> wish <span class="self">I</span> were a Hay -
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showGrassIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showGrass()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>The Grass so little has to do</h3>
    <p>
      The Grass so little has to do -<br>
      A Sphere of simple Green -<br>
      With only Butterflies to brood<br>
      And Bees to entertain -<br><br>
      And stir all day to <span class="pos">pretty</span> Tunes<br>
      The Breezes fetch along -<br>
      And hold the <span class="pos">Sunshine</span> in it's <span class="body">lap</span><br>
      And bow to everything -<br><br>
      And thread the Dews, all night, like <span class="pos">Pearls</span> -<br>
      And make itself so <span class="pos">fine</span><br>
      A Duchess were too common<br>
      For such a noticing -<br><br>
      And even when it <span class="neg">dies</span> - to pass<br>
      In Odors so <span class="pos">divine</span> -<br>
      Like <span class="pos">Lowly</span> spices, lain to sleep -<br>
      Or Amulates of Pine -<br><br>
      And then, in <span class="pos">Sovreign</span> <span class="place">Barns</span> to dwell -<br>
      And <span class="pos">dream</span> the Days away,<br>
      The Grass so little has to do<br>
      <span class="self">I</span> wish <span class="self">I</span> were a Hay -
    </p>
  </div>
  <div id="secondLanguage">
    <h3>L'Erba ha poco da fare</h3>
    <p>
      L'Erba ha poco da fare -<br>
      sfera d’umile verde<br>
      per allevare farfalle<br>
      e trastullare api.<br><br>
      Muoversi tutto il giorno<br>
      a melodie di brezza,<br>
      tenere in grembo il sole<br>
      ed inchinarsi a tutto.<br><br>
      Infilare rugiada<br>
      la notte come perle,<br>
      e farsi così bella<br>
      da offuscare duchesse.<br><br>
      Quando muore, svanire<br>
      in odori divini<br>
      come dormienti spezie<br>
      e amuleti di pino.<br><br>
      Ed abitando nei granai sovrani<br>
      i suoi giorni trascorrere nel sogno.<br>
      Poco da fare ha l’erba<br>
      ed io vorrei esser fieno!
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showFall() {
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showFallIt()">Show Italian</button>
  </div>
  <br><br>
  <h3>If you were coming in the Fall</h3>
  <p>
    If you were coming in the Fall,<br>
    <span class="self">I</span>'d brush the Summer by<br>
    With half a <span class="pos">smile</span>, and half a <span class="neg">spurn</span>,<br>
    As Housewives do, a Fly.<br><br>
    If <span class="self">I</span> could see you in a year,<br>
    <span class="self">I</span>'d wind the months in balls -<br>
    And put them each in separate <span class="place">Drawers</span>,<br>
    For fear the numbers fuse -<br><br>
    If only Centuries, delayed,<br>
    <span class="self">I</span>'d count them on <span class="self">my</span> <span class="body">Hand</span>,<br>
    Subtracting, till <span class="self">my</span> <span class="body">fingers</span> dropped<br>
    Into Van Dieman's <span class="place">Land</span>.<br><br>
    If certain, when this <span class="pos">life</span> was out -<br>
    That your's and <span class="self">mine</span>, should be -<br>
    <span class="self">I</span>'d toss it yonder, like a Rind,<br>
    And take <span class="pos">Eternity</span> -<br><br>
    But, now, uncertain of the length<br>
    Of this, that is between,<br>
    It goads <span class="self">me</span>, like the Goblin Bee -<br>
    That will not state - it's <span class="neg">sting</span>.
  </p>
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

function showFallIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showFall()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>If you were coming in the Fall</h3>
    <p>
      If you were coming in the Fall,<br>
      <span class="self">I</span>'d brush the Summer by<br>
      With half a <span class="pos">smile</span>, and half a <span class="neg">spurn</span>,<br>
      As Housewives do, a Fly.<br><br>
      If <span class="self">I</span> could see you in a year,<br>
      <span class="self">I</span>'d wind the months in balls -<br>
      And put them each in separate <span class="place">Drawers</span>,<br>
      For fear the numbers fuse -<br><br>
      If only Centuries, delayed,<br>
      <span class="self">I</span>'d count them on <span class="self">my</span> <span class="body">Hand</span>,<br>
      Subtracting, till <span class="self">my</span> <span class="body">fingers</span> dropped<br>
      Into Van Dieman's <span class="place">Land</span>.<br><br>
      If certain, when this <span class="pos">life</span> was out -<br>
      That your's and <span class="self">mine</span>, should be -<br>
      <span class="self">I</span>'d toss it yonder, like a Rind,<br>
      And take <span class="pos">Eternity</span> -<br><br>
      But, now, uncertain of the length<br>
      Of this, that is between,<br>
      It goads <span class="self">me</span>, like the Goblin Bee -<br>
      That will not state - it's <span class="neg">sting</span>.
    </p>
  </div>
  <div id="secondLanguage">
    <h3>Se tu venissi in autunno</h3>
    <p>
      Se tu venissi in autunno,<br>
      io scaccerei via l'estate<br>
      un po’ con un sorriso ed un po’ con dispetto,<br>
      come scaccia una mosca la massaia.<br><br>
      Se fra un anno potessi rivederti,<br>
      farei dei mesi altrettanti gomitoli<br>
      da riporre in cassetti separati,<br>
      per timore che i numeri si fondano.<br><br>
      Fosse l’attesa soltanto di secoli,<br>
      li conterei sulla mano,<br>
      sottraendo fin quando le dita mi cadessero<br>
      nella terra di Van Diemen.<br><br>
      Fossi certa che, dopo questa vita,<br>
      la tua e la mia venissero,<br>
      io questa getterei come una buccia<br>
      e prenderei l’eternità<br><br>
      Ora ignoro l’ampiezza<br>
      del tempo che intercorre a separarci,<br>
      e mi tortura come un’ape fantasma<br>
      che non vuole mostrare il pungiglione.
    </p>
  </div>  
  `;

  if (selfflag===true){
    self();
  }
  if (bodyflag===true){
    body();
  }
  if (placeflag===true){
    place();
  }
  if (negflag===true){
    neg();
  }
  if (posflag===true){
    pos();
  }
}

//functions to show the poems' buttons when click on poet's name in metadata table

function showsappho(){
  var sappho = document.getElementById("sappho");
  sappho.innerHTML=`
    <button type="button" onclick="hidesappho()" id="authorbtn"><i>Sappho</i></button>
    <button type="button" onclick="showOde()" id="clickable">Ode to Aphrodite</button>
    <button type="button" onclick="showSappho()" id="clickable">Sappho 31</button>
    <button type="button" onclick="showMidnight()" id="clickable">Midnight poem</button>
  `;  
}

function hidesappho(){
  var sappho = document.getElementById("sappho");
  sappho.innerHTML=`
    <button type="button" onclick="showsappho()" id="authorbtn"><i>Sappho</i></button>
    <button type="button" onclick="showOde()" id="hidden">Ode to Aphrodite</button>
    <button type="button" onclick="showSappho()" id="hidden">Sappho 31</button>
    <button type="button" onclick="showMidnight()" id="hidden">Midnight poem</button>
  `;  
}

function showdickinson(){
  var dickinson = document.getElementById("dickinson");
  dickinson.innerHTML=`
    <button type="button" onclick="hidedickinson()" id="authorbtn"><i>Emily Dickinson</i></button>
    <button type="button" onclick="showFall()" id="clickable">If You Were Coming in the Fall</button>
    <button type="button" onclick="showSlant()" id="clickable">There's a Certain Slant of Light</button>
    <button type="button" onclick="showGrass()" id="clickable">The Grass so little has to do</button>
  `;  
}

function hidedickinson(){
  var dickinson = document.getElementById("dickinson");
  dickinson.innerHTML=`
    <button type="button" onclick="showdickinson()" id="authorbtn"><i>Emily Dickinson</i></button>
    <button type="button" onclick="showFall()" id="hidden">If You Were Coming in the Fall</button>
    <button type="button" onclick="showSlant()" id="hidden">There's a Certain Slant of Light</button>
    <button type="button" onclick="showGrass()" id="hidden">The Grass so little has to do</button>
  `;  
}

function showkaur(){
  var kaur = document.getElementById("kaur");
  kaur.innerHTML=`
    <button type="button" onclick="hidekaur()" id="authorbtn"><i>Rupi Kaur</i></button>
    <button type="button" onclick="showHome()" id="clickable">Untitled (from home body)</button>
    <button type="button" onclick="showHate()" id="clickable">self-hate</button>
    <button type="button" onclick="showMilk()" id="clickable">Untitled (from milk and honey)</button>
  `;  
}

function hidekaur(){
  var kaur = document.getElementById("kaur");
  kaur.innerHTML=`
    <button type="button" onclick="showkaur()" id="authorbtn"><i>Rupi Kaur</i></button>
    <button type="button" onclick="showHome()" id="hidden">Untitled (from home body)</button>
    <button type="button" onclick="showHate()" id="hidden">self-hate</button>
    <button type="button" onclick="showMilk()" id="hidden">Untitled (from milk and honey)</button>
  `;  
}

//functions to highlight words in poems related to themes

function self(){
  var x=document.getElementsByClassName("self");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: gold;";
  }  

  selfflag=true;

  var metadatatable=document.getElementById("metaSelf");
  metadatatable.innerHTML=`
    <button type="button" onclick="selfback()" id="metadata" class="self">Self-reference</button>
  `;
}

function selfback(){
  var x=document.getElementsByClassName("self");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: none;";
  } 

  selfflag=false;

  var metadatatable=document.getElementById("metaSelf");
  metadatatable.innerHTML=`
    <button type="button" onclick="self()" id="metadata" class="self">Self-reference</button>
  `;
}

function body(){
  var x=document.getElementsByClassName("body");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: #ff77d2;";
  }  

  bodyflag=true;

  var metadatatable=document.getElementById("metaBody");
  metadatatable.innerHTML=`
    <button type="button" onclick="bodyback()" id="metadata" class="body">Body parts</button>
  `;
}

function bodyback(){
  var x=document.getElementsByClassName("body");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: none;";
  } 

  bodyflag=false;

  var metadatatable=document.getElementById("metaBody");
  metadatatable.innerHTML=`
    <button type="button" onclick="body()" id="metadata" class="body">Body parts</button>
  `;
}

function place(){
  var x=document.getElementsByClassName("place");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: #77bdff;";
  }  

  placeflag=true;

  var metadatatable=document.getElementById("metaPlace");
  metadatatable.innerHTML=`
    <button type="button" onclick="placeback()" id="metadata" class="place">Generic places</button>
  `;
}

function placeback(){
  var x=document.getElementsByClassName("place");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: none;";
  } 

  placeflag=false;

  var metadatatable=document.getElementById("metaPlace");
  metadatatable.innerHTML=`
    <button type="button" onclick="place()" id="metadata" class="place">Generic places</button>
  `;
}

function neg(){
  var x=document.getElementsByClassName("neg");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: #ff5757;";
  }  

  negflag=true;

  var metadatatable=document.getElementById("metaNeg");
  metadatatable.innerHTML=`
    <button type="button" onclick="negback()" id="metadata" class="neg">Negatives</button>
  `;
}

function negback(){
  var x=document.getElementsByClassName("neg");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: none;";
  } 

  negflag=false;

  var metadatatable=document.getElementById("metaNeg");
  metadatatable.innerHTML=`
    <button type="button" onclick="neg()" id="metadata" class="neg">Negatives</button>
  `;
}

function pos(){
  posflag=true;
  
  var x=document.getElementsByClassName("pos");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: #65ff57;";
  }  

  var metadatatable=document.getElementById("metaPos");
  metadatatable.innerHTML=`
    <button type="button" onclick="posback()" id="metadata" class="pos">Positives</button>
  `;
}

function posback(){
  posflag=false;

  var x=document.getElementsByClassName("pos");
  for (i = 0; i < x.length; i++) {
    x[i].style = "background-color: none;";
  } 

  var metadatatable=document.getElementById("metaPos");
  metadatatable.innerHTML=`
    <button type="button" onclick="pos()" id="metadata" class="pos">Positives</button>
  `;
}