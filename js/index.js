const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    createCategories(data.data);
}

const createCategories = (data) => {
    data.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = `
            <button id="${category.category}" class="btn px-5 py-1 text-[rgba(37,37,37,0.70)] bg-[rgba(37,37,37,0.15)] rounded font-medium">${category.category}</button>
        `
        document.getElementById('categories-section').appendChild(categoryContainer);
        const btn = categoryContainer.children[0];
        btn.addEventListener('click', () => {
            videosCardData(category['category_id']);
            removeColor();
            btn.style.backgroundColor = '#FF1F3D'
            btn.style.fontSize = '18px';
            btn.style.fontWeigh = '600';
            btn.style.color = 'white';
        });
    });
    document.getElementById("All").style.backgroundColor = '#FF1F3D';
    document.getElementById("All").style.fontSize = '18px';
    document.getElementById("All").style.fontWeigh = '600';
    document.getElementById("All").style.color = 'white';

}

const videosCardData = async (id = 1000) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    displayVideoCards(data.data);

}

const displayVideoCards = (data) => {
    console.log(data);
    if (data.length===0) {
        document.getElementById('error').classList.remove('hidden');
    } else {
        document.getElementById('error').classList.add('hidden');
    }
    const cardsSection = document.getElementById('cards-section');
    cardsSection.innerHTML = '';
    data.forEach(video => {
        const cardDiv = document.createElement('div');
        const thumbnail = video.thumbnail;
        const title = video.title;
        const authors = video.authors[0];
        const profilePicture = authors['profile_picture'];
        const profileName = authors['profile_name'];
        let verified='';
        if(authors['verified']){
            verified  ='<img src="./icons/true.svg" alt="" class="">';
        }
        const others = video.others;
        const views = others.views;
        cardDiv.innerHTML = `
            <img class="h-[200px] w-[312px] rounded-lg bg-gray-300" src="${thumbnail}" alt="">
            <div class="flex gap-3 mt-5">
                <img class="size-10 bg-gray-300 rounded-[50%]" src="${profilePicture}" alt="">
                <div class="space-y-[10px]">
                    <h3 class="max-w-[260px] font-bold">${title}</h3>
                    <p class="flex gap-2 text-sm">${profileName} ${verified}</p>
                    <p class="text-sm"><span>${views} </span>views</p>
                </div>
            </div>`
        cardsSection.appendChild(cardDiv);
    });
}

function removeColor() {
    const categories = document.getElementById('categories-section');
    const btnDiv = categories.children;
    for (const btns of btnDiv) {
        const btn = btns.children[0];
        btn.style.backgroundColor = ''
        btn.style.fontSize = '';
        btn.style.fontWeigh = '';
        btn.style.color = '';
    };
}
videosCardData();
loadCategories();