const $=s=>document.querySelector(s), get=k=>sessionStorage.getItem(k), set=(k,v)=>sessionStorage.setItem(k,v);
let fs=+(localStorage.getItem('fs')||125);
const aplica=()=>{document.documentElement.style.setProperty('--fs',fs+'%');document.body.classList.toggle('contraste',localStorage.getItem('c')==='1')};aplica();
$('#mais').onclick=()=>{fs=Math.min(175,fs+15);localStorage.setItem('fs',fs);aplica()};
$('#menos').onclick=()=>{fs=Math.max(100,fs-15);localStorage.setItem('fs',fs);aplica()};
$('#contraste').onclick=()=>{localStorage.setItem('c',localStorage.getItem('c')==='1'?'0':'1');aplica()};
const pg=document.body.dataset.page;
// Glossário: termo difícil -> explicação em linguagem simples
document.querySelectorAll('.termo').forEach(b=>b.onclick=()=>{$('#gloss').innerHTML=`<b>${b.dataset.t}:</b> ${GLOSSARIO[b.dataset.t]}`});
const res=()=>JSON.parse(get('r')||'null');
const calc=r=>BENEFICIOS.map(b=>({...b,ok:!!b.regra(r)}));

if(pg==='inicio'){ $('#ir').onclick=()=>location.href='questionario.html'; }

if(pg==='questionario'){ // uma pergunta por vez
  const passos=[...document.querySelectorAll('.pergunta')];let i=0;const resp={};
  const mostra=()=>{passos.forEach((p,k)=>p.hidden=k!==i);$('#pos').textContent=`Pergunta ${i+1} de ${passos.length}`;$('#voltar').hidden=i===0;
    $('#prox').textContent=i===passos.length-1?'Ver meus benefícios':'Próxima';passos[i].querySelector('input').focus()};
  $('#voltar').onclick=()=>{i--;mostra()};
  $('#form').onsubmit=e=>{e.preventDefault();const p=passos[i],inp=p.querySelector('input[type=number],input[type=radio]:checked');
    const er=p.querySelector('.erro');
    if(!inp||inp.value===''||(inp.type==='number'&&+inp.value<(inp.min||0))){er.textContent='Responda para continuar.';p.querySelector('input').focus();return}
    er.textContent='';resp[p.dataset.k]=inp.value;
    if(i<passos.length-1){i++;mostra();return}
    const pessoas=Math.max(1,+resp.pessoas);
    set('r',JSON.stringify({pc:+resp.renda/pessoas,pessoas,renda:+resp.renda,idoso:resp.idoso==='sim',def:resp.def==='sim',cad:resp.cad,bpc:false}));
    location.href='resultado.html'};
  mostra();
}

if(pg==='resultado'){ // resultado dinâmico
  const r=res();if(!r)location.href='questionario.html';
  const l=calc(r);$('#pc').textContent=r.pc.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const pode=l.filter(b=>b.ok);
  $('#resumo').textContent=pode.length?`Você pode ter direito a ${pode.length} benefício(s).`:'Pelas suas respostas, nenhum benefício apareceu. Vale conversar no CRAS.';
  const mostra=()=>{const so=$('#so').checked;
    $('#lista').innerHTML=l.filter(b=>!so||b.ok).map(b=>`<li class="card"><h3>${b.nome}</h3><p>${b.oQue}</p>
     <p class="${b.ok?'sim':'nao'}"><b>${b.ok?'Você pode ter direito':'Provavelmente não agora'}</b>${b.ok?' porque '+b.motivo:''}</p>
     <a class="btn${b.ok?'':' sec'}" href="passos.html?b=${b.id}">Ver o passo a passo</a></li>`).join('')};
  $('#so').onchange=mostra;mostra();
}

if(pg==='passos'){ // checklist salvo no navegador
  const id=new URLSearchParams(location.search).get('b'),b=BENEFICIOS.find(x=>x.id===id);if(!b)location.href='resultado.html';
  $('#nome').textContent=b.nome;const k='feito-'+id;let f=JSON.parse(localStorage.getItem(k)||'[]');
  $('#passos').innerHTML=b.passos.map((p,i)=>`<li class="card"><label><input type="checkbox" data-i="${i}" ${f.includes(i)?'checked':''}> Passo ${i+1}: ${p}</label></li>`).join('');
  const prog=()=>{$('#prog').max=b.passos.length;$('#prog').value=f.length;
    $('#txt').textContent=f.length===b.passos.length?'Você concluiu todos os passos!':`Você fez ${f.length} de ${b.passos.length} passos. Sua lista fica salva neste aparelho.`};
  $('#passos').onchange=e=>{const i=+e.target.dataset.i;f=e.target.checked?[...f,i]:f.filter(x=>x!==i);localStorage.setItem(k,JSON.stringify(f));prog()};prog();
  $('#imp').onclick=()=>print();
}
