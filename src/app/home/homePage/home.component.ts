import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ProductSlider, ProductOneSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/logo/logo.png'; // Theme logo
  public footerLogo: string = 'assets/images/logo/logo-white.png'; // Footer Logo

  public products: Product[] = [];
  public productCollections: any[] = [];
  public active;

  public ProductSliderConfig: any = ProductSlider;
  public ProductSliderOneConfig: any = ProductOneSlider;

  public backend = 'http://lookc.staging.dynamicweb-cms.com';
  public response: any;

  // Big home banner
  public bigHomeImg: any;
  public bigHomeImgTitle: any;
  public bigHomeImgSubtitle: any;
  public bigHomeImgButton: any;
  // 2 categories banner
  public collectionBannerImgOne: any;
  public collectionBannerImgTwo: any;
  public collectionBannerNameOne: any;
  public collectionBannerNameTwo: any;
  public collectionBannerSubtitleOne: any;
  public collectionBannerSubtitleTwo: any;
  // Brands 
  public brands: any;
  public brandsArr = [];
  // Paralax
  public paralaxImg: any;
  public paralaxTitle: any;
  public paralaxSubtitle: any;
  public paralaxButton: any;
  // Category grid
  public categoryGridImageOne: any;
  public categoryGridSubtitleOne: any;
  public categoryGridTitleOne: any;
  public categoryGridButtonOne: any;
  public categoryGridImageTwo: any;
  public categoryGridSubtitleTwo: any;
  public categoryGridTitleTwo: any;
  public categoryGridButtonTwo: any;
  public categoryGridImageThree: any;
  public categoryGridSubtitleThree: any;
  public categoryGridTitleThree: any;
  public categoryGridButtonThree: any;

  constructor(public productService: ProductService, private http: HttpClient) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'bikes');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    })
    // Big home banner
    this.http.get(this.backend + '/dwapi/content/paragraphs/9087').subscribe(res => {
      this.response = res;
      this.bigHomeImg = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.bigHomeImgTitle = this.response.Name;
      this.bigHomeImgSubtitle = this.response.Item.Fields[4].Value;
      this.bigHomeImgButton = this.response.Item.Fields[7].Value;
    })
    // 2 categories banner
    this.http.get(this.backend + '/dwapi/content/paragraphs/9101').subscribe(res => {
      this.response = res;
      this.collectionBannerImgOne = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.collectionBannerNameOne = this.response.Name;
      this.collectionBannerSubtitleOne = this.response.Item.Fields[4].Value;
    })
    this.http.get(this.backend + '/dwapi/content/paragraphs/9099').subscribe(res => {
      this.response = res;
      this.collectionBannerImgTwo = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.collectionBannerNameTwo = this.response.Name;
      this.collectionBannerSubtitleTwo = this.response.Item.Fields[4].Value;
    })
    // Brands
    this.http.get(this.backend + '/dwapi/content/paragraphs/9019').subscribe(res => {
      this.response = res;
      this.brands = this.response.Item.Fields[1].Value;
      this.brands.forEach(brand => {
        this.brandsArr.push(brand.Fields[8].Value);
      });
    })
    // Paralax
    this.http.get(this.backend + '/dwapi/content/paragraphs/9103').subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.paralaxImg = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.paralaxSubtitle = this.response.Name;
      this.paralaxTitle = this.response.Item.Fields[4].Value;
      this.paralaxButton = this.response.Item.Fields[7].Value;
    })
      // Category grid one
      this.http.get(this.backend + '/dwapi/content/paragraphs/9105').subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.categoryGridImageOne = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.categoryGridTitleOne = this.response.Name;
      this.categoryGridSubtitleOne = this.response.Item.Fields[4].Value;
      this.categoryGridButtonOne = this.response.Item.Fields[7].Value;
    })
      // Category grid two
      this.http.get(this.backend + '/dwapi/content/paragraphs/9107').subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.categoryGridImageTwo = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.categoryGridTitleTwo = this.response.Name;
      this.categoryGridSubtitleTwo = this.response.Item.Fields[4].Value;
      this.categoryGridButtonTwo = this.response.Item.Fields[7].Value;
    })
    // Category grid three
      this.http.get(this.backend + '/dwapi/content/paragraphs/9109').subscribe(res => {
      this.response = res;
      console.log(this.response);
      this.categoryGridImageThree = this.backend + this.response.Item.Fields[0].Value[0].Path;
      this.categoryGridTitleThree = this.response.Name;
      this.categoryGridSubtitleThree = this.response.Item.Fields[4].Value;
      this.categoryGridButtonThree = this.response.Item.Fields[7].Value;
    })
  }

  // Categories
  public categories = ['Flagships', 'Foldables', 'Apple', 'Earbuds', 'Samsung', 'Nothing'];

  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#7F4992');
  }

  ngOnDestroy(): void {
    // Remove Color
    /* document.documentElement.style.removeProperty('--theme-deafult'); */
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
