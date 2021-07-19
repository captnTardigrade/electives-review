let editButton = document.querySelector(".edit-button");
const currentReview = document.querySelector("#current-review");

const currentReviewHTML = currentReview.innerHTML;
const toggleForm = () => {
  currentReview.innerHTML = `
      <div class="card shadow p-3 mb-3">
                  <form action="/electives/${electiveId}/reviews/${review._id}" class="validate-form" method="POST" novalidate>
                      <div class="form-floating my-3">
                          <textarea class="form-control" placeholder="Leave a comment here" name="review[body]"
                              id="floatingTextarea2" style="height: 100px" required>${review.body}</textarea>
                          <label for="floatingTextarea2">Share your thoughts</label>
                      </div>
                      <button type="button" class="btn btn-danger float-end cancel-button">Cancel</button>
                      <button class="btn btn-info text-white me-2 float-end" >Save</button>
                      <fieldset class="starability-basic mb-3">
                          <h5>Rating</h5>
                          <input type="radio" id="no-rate" class="input-no-rate" name="review[rating]" value="0" checked
                              aria-label="No rating." />
                          <input type="radio" id="rating-1" name="review[rating]" value="1" />
                          <label for="rating-1" title="Terrible">1 star</label>
                          <input type="radio" id="rating-2" name="review[rating]" value="2" />
                          <label for="rating-2" title="Not good">2 stars</label>
                          <input type="radio" id="rating-3" name="review[rating]" value="3" />
                          <label for="rating-3" title="Average">3 stars</label>
                          <input type="radio" id="rating-4" name="review[rating]" value="4" />
                          <label for="rating-4" title="Very good">4 stars</label>
                          <input type="radio" id="rating-5" name="review[rating]" value="5" />
                          <label for="rating-5" title="Amazing">5 stars</label>
                      </fieldset>
                  </form>
              </div>`;
  const cancelButton = document.querySelector(".cancel-button");
  cancelButton.addEventListener("click", () => {
    currentReview.innerHTML = currentReviewHTML;
    editButton = document
      .querySelector(".edit-button")
      .addEventListener("click", toggleForm);
  });
};
editButton.addEventListener("click", toggleForm);
