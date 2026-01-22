(function(){
  // Theme (bulletproof)
  const KEY_THEME = "goltra_theme";
  const body = document.body;

  function applyTheme(t){
    if(t === "light"){ body.classList.add("light"); }
    else { body.classList.remove("light"); t = "dark"; }
    try{ localStorage.setItem(KEY_THEME, t); }catch(e){}
    const label = document.querySelector("[data-theme-label]");
    if(label) label.textContent = body.classList.contains("light") ? "Light" : "Dark";
  }

  function initTheme(){
    let t = null;
    try{ t = localStorage.getItem(KEY_THEME); }catch(e){}
    if(t !== "light" && t !== "dark"){
      const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
      t = prefersLight ? "light" : "dark";
    }
    applyTheme(t);
  }

  function bindTheme(){
    document.querySelectorAll("[data-toggle-theme]").forEach(btn=>{
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        applyTheme(body.classList.contains("light") ? "dark" : "light");
      });
    });
  }

  // Dropdowns
  function bindDropdowns(){
    document.querySelectorAll("[data-dropdown]").forEach(dd=>{
      const btn = dd.querySelector("[data-dropbtn]");
      if(!btn) return;
      btn.addEventListener("click", (e)=>{
        e.preventDefault();
        // close others
        document.querySelectorAll("[data-dropdown].open").forEach(x=>{ if(x!==dd) x.classList.remove("open"); });
        dd.classList.toggle("open");
      });
    });
    document.addEventListener("click",(e)=>{
      if(!e.target.closest("[data-dropdown]")){
        document.querySelectorAll("[data-dropdown].open").forEach(x=>x.classList.remove("open"));
      }
    });
  }

  // Mobile menu
  function bindMobile(){
    const btn = document.querySelector("[data-toggle-menu]");
    const menu = document.querySelector("[data-mobile]");
    if(!btn || !menu) return;
    menu.style.display = "none";
    btn.addEventListener("click", ()=>{
      const open = menu.getAttribute("data-open")==="true";
      menu.setAttribute("data-open", open ? "false":"true");
      menu.style.display = open ? "none":"block";
    });
  }

  // Cookie banner
  function initCookie(){
    const KEY = "goltra_cookie";
    const box = document.querySelector(".cookie");
    const accept = document.querySelector("[data-cookie-accept]");
    if(!box || !accept) return;
    let ok = null;
    try{ ok = localStorage.getItem(KEY); }catch(e){}
    if(ok !== "accepted"){ box.style.display = "block"; }
    accept.addEventListener("click", ()=>{
      try{ localStorage.setItem(KEY,"accepted"); }catch(e){}
      box.style.display = "none";
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ()=>{
      initTheme(); bindTheme(); bindDropdowns(); bindMobile(); initCookie();
    });
  } else {
    initTheme(); bindTheme(); bindDropdowns(); bindMobile(); initCookie();
  }
})();
