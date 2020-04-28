const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');

console.log(list);

const addRecipe = (recipe, id) => {
    let time = recipe.created_at.toDate();
    let html = `
        <li data-id="${id}">
            <div>${recipe.title}</div>
            <div>${time}</div>
            <button class="btn btn-danger btn-sm my-2 ">Delete</button>
        </li>
    `;
    list.innerHTML += html;
    // console.log(html);
}

// Get documents
// Old one
/*
db.collection('recipes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // console.log(doc.id);
        addRecipe(doc.data(), doc.id);
    });
}).catch(err => {
    console.log(err);
});
*/
const deleteRecipe = (id) => {
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe => {
        if (recipe.getAttribute('data-id') === id) {
            recipe.remove();
        }
    });
}


// Get documents - new - Update Realtime
// Everything there is a change in the database -> you take a snapshot and 
// then this callback function send us the snapshot
db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if (change.type === 'added') {
            addRecipe(doc.data(), doc.id);
        } else if (change.type === 'removed') {
            deleteRecipe(doc.id);
        }
    });
});



// add documents
form.addEventListener('submit', e => {
    e.preventDefault();
    
    const now = new Date();
    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    db.collection('recipes').add(recipe).then(() => {
        console.log('recipe added');
    }).catch( err => {
        console.log(err);
    });
});


// Deleting data
list.addEventListener('click', e => {
    // console.log(e);
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(() => {
            console.log('recipe deleted');
        });
    }
})

// unsub from database changes
// button.addEventListener('click', () => {
//     unsub();
//     console.log('unsubscribed from collection changes');
// });