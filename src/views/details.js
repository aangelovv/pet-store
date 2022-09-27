import { html } from '../../node_modules/lit-html/lit-html.js';
import { deletePostById, getPostById, } from '../api/data.js';
import { getUserData } from '../utility.js';


const detailsTemplate =(pet, isOwner, onDelete) => html `
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>${pet.name}</h1>
                        <h3>${pet.breed}</h3>
                        <h4>${pet.age}</h4>
                        <h4>${pet.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        
                    ${isOwner ?
          html` <a class="edit" href="/edit/${pet._id}">Edit</a>
           <a class="remove" href="javascript:void(0)" @click=${onDelete}>Delete</a> ` : null }
                        <!--(Bonus Part) Only for no creator and user-->
                        <!-- {/* <a href="#" class="donate">Donate</a> */} -->
                    </div>
                </div>
            </div>
        </section>

`

export async function detailsPage(ctx) {
 
    const pet=await getPostById(ctx.params.id)
  

  const userData=getUserData()
const isOwner=userData && pet._ownerId === userData._id

ctx.render(detailsTemplate(pet, isOwner, onDelete))
  


async function onDelete() {
      const confirmed = confirm('Are you sure?');
      if (confirmed) {
          await deletePostById(ctx.params.id);
          ctx.page.redirect('/dashboard');
      }
  }
}

