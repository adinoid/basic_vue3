app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/

    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image" />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <a :href="url">Panturacode</a>
          <p v-if="inventory > 10">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
          <p v-else>Out of Stock</p>
          <p v-if="onSale">{{ saleMessage }}</p>


          <p>Shipping: {{ shipping }}</p>
          
          <product-details :details="details"></product-details>

          <ul>
            <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
          </ul>

          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :class="[ isActive ? activeClass : '' ]"
            :style="{ 'background-color':variant.color }"
          ></div>

          <div :style="styles"></div>

          <button
            class="button"
            :class="{ disabledButton : !inStock }"
            :disabled="!inStock"
            @click="addToCart"
          >
            Add to Cart
          </button>

          <button 
            class="button" 
            :class="{ disabledButton : !inStock }"
            :disabled="!inStock"
            @click="removeFromCart">
            Remove to Cart
          </button>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Panturacode',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, assumenda!',
      url: 'https://www.panturacode.com',
      inventory: 1,
      onSale: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
      sizes: ['S', 'M', 'L', 'XL'],
      variants: [
        {
          id: 2234,
          color: 'green',
          image: './assets/images/socks_green.jpg',
          quantity: 50,
        },
        {
          id: 2235,
          color: 'blue',
          image: './assets/images/socks_blue.jpg',
          quantity: 0,
        },
      ],
      styles: {
        color: 'red',
        fontSize: '14px',
      },
      activeClass: true,
      isActive: false,
      selectedVariant: 0,
      reviews: [],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateImage(variantImage) {
      this.image = variantImage
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    saleMessage() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' is on sale.'
      }
      return ''
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    },
  },
})
