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
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
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

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})

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
    our souls<br>
    will not be soothed<br>
    by what we achieve<br>
    how we look<br>
    or all the hard work we do<br>
    even if we managed to<br>
    make all the money in the world<br>
    we’d be left feeling empty for something<br>
    our souls ache for community<br>
    our deepest being craves one another<br>
    we need to be connected<br>
    to feel alive<br>
  </p>
  `;
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
      our souls<br>
      will not be soothed<br>
      by what we achieve<br>
      how we look<br>
      or all the hard work we do<br>
      even if we managed to<br>
      make all the money in the world<br>
      we’d be left feeling empty for something<br>
      our souls ache for community<br>
      our deepest being craves one another<br>
      we need to be connected<br>
      to feel alive<br>
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
    somewhere along the way<br>
    i lost the self-love<br>
    and became my greatest enemy<br>
    i thought i’d seen the devil before<br>
    in the uncles who touched us as children<br>
    the mobs that burned our city to the ground<br>
    but i’d never seen someone as hungry<br>
    for my flesh as i was<br>
    i peeled my skin off just to feel awake<br>
    wore it inside out<br>
    sprinkled it with salt to punish myself<br>
    turmoil clotted my nerves<br>
    my blood curdled<br>
    i even tried to bury myself alive<br>
    but the dirt recoiled<br>
    you have already rotted it said<br>
    there is nothing left for me to do<br>
  </p>
  `;
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
      somewhere along the way<br>
      i lost the self-love<br>
      and became my greatest enemy<br>
      i thought i’d seen the devil before<br>
      in the uncles who touched us as children<br>
      the mobs that burned our city to the ground<br>
      but i’d never seen someone as hungry<br>
      for my flesh as i was<br>
      i peeled my skin off just to feel awake<br>
      wore it inside out<br>
      sprinkled it with salt to punish myself<br>
      turmoil clotted my nerves<br>
      my blood curdled<br>
      i even tried to bury myself alive<br>
      but the dirt recoiled<br>
      you have already rotted it said<br>
      there is nothing left for me to do
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
    did you think i was a city<br>
    big enough for a weekend getaway<br>
    i am the town surrounding it<br>
    the one you’ve never heard of<br>
    but always pass through<br>
    there are no neon lights here<br>
    no skyscrapers or statues<br>
    but there is thunder<br>
    for i make bridges tremble<br>
    i am not street meat i am homemade jam<br>
    i am the crackle of a fireplace <br>
    i’d burn you and you still<br>
    couldn’t take your eyes off me<br>
    cause i’d look so beautiful doing it<br>
    you’d blush<br>
    i am not a hotel room i am home<br>
    i am not the whiskey you want<br>
    i am the water you need<br>
    don’t come here with expectations<br>
    and try to make a vacation out of me
  </p>
  `;
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
      did you think i was a city<br>
      big enough for a weekend getaway<br>
      i am the town surrounding it<br>
      the one you’ve never heard of<br>
      but always pass through<br>
      there are no neon lights here<br>
      no skyscrapers or statues<br>
      but there is thunder<br>
      for i make bridges tremble<br>
      i am not street meat i am homemade jam<br>
      i am the crackle of a fireplace <br>
      i’d burn you and you still<br>
      couldn’t take your eyes off me<br>
      cause i’d look so beautiful doing it<br>
      you’d blush<br>
      i am not a hotel room i am home<br>
      i am not the whiskey you want<br>
      i am the water you need<br>
      don’t come here with expectations<br>
      and try to make a vacation out of me
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
    On the throne of many hues, Immortal Aphrodite,<br>
    child of Zeus, weaving wiles: I beg you,<br>
    do not break my spirit, O Queen,<br>
    with pain or sorrow<br><br>
    but come – if ever before from far away<br>
    you heard my voice and listened,<br>
    and leaving your father’s<br>
    golden home you came,<br><br>
    your chariot yoked with lovely sparrows<br>
    drawing you quickly over the dark earth<br>
    in a whirling cloud of wings down<br>
    the sky through midair,<br><br>
    suddenly here. Blessed One, with a smile<br>
    on your deathless face, you ask<br>
    what have I suffered again<br><br>
    and why do I call again<br>
    and what in my wild heart do I most wish<br>
    would happen: “Once again who must I<br>
    persuade to turn back to your love?<br>
    Sappho, who wrongs you?<br>
    If now she flees, soon she’ll chase.<br>
    If rejecting gifts, then she’ll give.<br>
    If not loving, soon she’ll love<br>
    even against her will.”<br><br>
    Come to me now – release me from these troubles, everything my heart longs<br>
    to have fulfilled, fulfill, and you<br>
    be my ally.
  </p>
  `;
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
      On the throne of many hues, Immortal Aphrodite,<br>
      child of Zeus, weaving wiles: I beg you,<br>
      do not break my spirit, O Queen,<br>
      with pain or sorrow<br><br>
      but come – if ever before from far away<br>
      you heard my voice and listened,<br>
      and leaving your father’s<br>
      golden home you came,<br><br>
      your chariot yoked with lovely sparrows<br>
      drawing you quickly over the dark earth<br>
      in a whirling cloud of wings down<br>
      the sky through midair,<br><br>
      suddenly here. Blessed One, with a smile<br>
      on your deathless face, you ask<br>
      what have I suffered again<br><br>
      and why do I call again<br>
      and what in my wild heart do I most wish<br>
      would happen: “Once again who must I<br>
      persuade to turn back to your love?<br>
      Sappho, who wrongs you?<br>
      If now she flees, soon she’ll chase.<br>
      If rejecting gifts, then she’ll give.<br>
      If not loving, soon she’ll love<br>
      even against her will.”<br><br>
      Come to me now – release me from these troubles, everything my heart longs<br>
      to have fulfilled, fulfill, and you<br>
      be my ally.
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
    That man seems to me to be equal to the gods<br>
    who is sitting opposite you<br>
    and hears you nearby<br>
    speaking sweetly<br><br>
    and laughing delightfully, which indeed<br>
    makes my heart flutter in my breast;<br>
    for when I look at you even for a short time,<br>
    it is no longer possible for me to speak<br><br>
    but it is as if my tongue is broken<br>
    and immediately a subtle fire has run over my skin,<br>
    I cannot see anything with my eyes,<br>
    and my ears are buzzing<br><br>
    a cold sweat comes over me, trembling<br>
    seizes me all over, I am paler<br>
    than grass, and I seem nearly<br>
    to have died.<br><br>
    but everything must be dared/endured, since<br>
    (?even a poor man) ...
  </p>
  `;
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
      That man seems to me to be equal to the gods<br>
      who is sitting opposite you<br>
      and hears you nearby<br>
      speaking sweetly<br><br>
      and laughing delightfully, which indeed<br>
      makes my heart flutter in my breast;<br>
      for when I look at you even for a short time,<br>
      it is no longer possible for me to speak<br><br>
      but it is as if my tongue is broken<br>
      and immediately a subtle fire has run over my skin,<br>
      I cannot see anything with my eyes,<br>
      and my ears are buzzing<br><br>
      a cold sweat comes over me, trembling<br>
      seizes me all over, I am paler<br>
      than grass, and I seem nearly<br>
      to have died.<br><br>
      but everything must be dared/endured, since<br>
      (?even a poor man) ...
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
    but I sleep alone.
  </p>
  `;
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
      but I sleep alone.
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
    There's a certain Slant of light,<br>
    Winter Afternoons -<br>
    That oppresses, like the Heft<br>
    Of Cathedral Tunes -<br><br>
    Heavenly Hurt, it gives us -<br>
    We can find no scar,<br>
    But internal difference,<br>
    Where the Meanings, are -<br><br>
    None may teach it - Any -<br>
    'Tis the Seal Despair -<br>
    An imperial Affliction<br>
    Sent us of the Air -<br><br>
    When it comes, the Landscape listens -<br>
    Shadows - hold their breath -<br>
    When it goes, 'tis like the Distance<br>
    On the look of Death -
  </p>
  `;
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
      There's a certain Slant of light,<br>
      Winter Afternoons -<br>
      That oppresses, like the Heft<br>
      Of Cathedral Tunes -<br><br>
      Heavenly Hurt, it gives us -<br>
      We can find no scar,<br>
      But internal difference,<br>
      Where the Meanings, are -<br><br>
      None may teach it - Any -<br>
      'Tis the Seal Despair -<br>
      An imperial Affliction<br>
      Sent us of the Air -<br><br>
      When it comes, the Landscape listens -<br>
      Shadows - hold their breath -<br>
      When it goes, 'tis like the Distance<br>
      On the look of Death -
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
    And stir all day to pretty Tunes<br>
    The Breezes fetch along -<br>
    And hold the Sunshine in it's lap<br>
    And bow to everything -<br><br>
    And thread the Dews, all night, like Pearls -<br>
    And make itself so fine<br>
    A Duchess were too common<br>
    For such a noticing -<br><br>
    And even when it dies - to pass<br>
    In Odors so divine -<br>
    Like Lowly spices, lain to sleep -<br>
    Or Amulates of Pine -<br><br>
    And then, in Sovreign Barns to dwell -<br>
    And dream the Days away,<br>
    The Grass so little has to do<br>
    I wish I were a Hay -
  </p>
  `;
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
      And stir all day to pretty Tunes<br>
      The Breezes fetch along -<br>
      And hold the Sunshine in it's lap<br>
      And bow to everything -<br><br>
      And thread the Dews, all night, like Pearls -<br>
      And make itself so fine<br>
      A Duchess were too common<br>
      For such a noticing -<br><br>
      And even when it dies - to pass<br>
      In Odors so divine -<br>
      Like Lowly spices, lain to sleep -<br>
      Or Amulates of Pine -<br><br>
      And then, in Sovreign Barns to dwell -<br>
      And dream the Days away,<br>
      The Grass so little has to do<br>
      I wish I were a Hay -
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
    I'd brush the Summer by<br>
    With half a smile, and half a spurn,<br>
    As Housewives do, a Fly.<br><br>
    If I could see you in a year,<br>
    I'd wind the months in balls -<br>
    And put them each in separate Drawers,<br>
    For fear the numbers fuse -<br><br>
    If only Centuries, delayed,<br>
    I'd count them on my Hand,<br>
    Subtracting, till my fingers dropped<br>
    Into Van Dieman's Land.<br><br>
    If certain, when this life was out -<br>
    That your's and mine, should be -<br>
    I'd toss it yonder, like a Rind,<br>
    And take Eternity -<br><br>
    But, now, uncertain of the length<br>
    Of this, that is between,<br>
    It goads me, like the Goblin Bee -<br>
    That will not state - it's sting.
  </p>
  `;
}

function showFallIt(){
  var chosenpoem = document.getElementById("chosenpoem");
  chosenpoem.innerHTML=`
  <br>
  <div class="btn-group">
    <button onclick="showFallIt()">Hide Italian</button>
  </div>
  <br><br>
  <div id="Eng">
    <h3>If you were coming in the Fall</h3>
    <p>
      If you were coming in the Fall,<br>
      I'd brush the Summer by<br>
      With half a smile, and half a spurn,<br>
      As Housewives do, a Fly.<br><br>
      If I could see you in a year,<br>
      I'd wind the months in balls -<br>
      And put them each in separate Drawers,<br>
      For fear the numbers fuse -<br><br>
      If only Centuries, delayed,<br>
      I'd count them on my Hand,<br>
      Subtracting, till my fingers dropped<br>
      Into Van Dieman's Land.<br><br>
      If certain, when this life was out -<br>
      That your's and mine, should be -<br>
      I'd toss it yonder, like a Rind,<br>
      And take Eternity -<br><br>
      But, now, uncertain of the length<br>
      Of this, that is between,<br>
      It goads me, like the Goblin Bee -<br>
      That will not state - it's sting.
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
}