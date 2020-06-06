const ufSelect = document.querySelector("select[name=uf]");

async function populateUFs(estado){   
    
    await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        
        for(const state of states){
            estado.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs(ufSelect)

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true
    
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })   
}

ufSelect.addEventListener("change", getCities);



/**
 *  Itens de coleta
 */

 const itemsToCollect = document.querySelectorAll(".items-grid li")

 for(const item of itemsToCollect){
     item.addEventListener('click', handleSelectedItem)
 }

 const inputHidden = document.querySelector("input[name=items");
 let selectedItems = []

 function handleSelectedItem(event) {
   const itemLi = event.target;
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId;
        return itemFound
    })

    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    inputHidden.value = selectedItems

    
 }









