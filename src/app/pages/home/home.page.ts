import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Article {
  source: { id: string | null; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  apiUrl = 'https://newsapi.org/v2/top-headlines?country=us';
  apiKey = '5c067999cef94ac58b05c0d7f88c36b7';

  mainArticle?: Article;
  secondaryArticles: Article[] = [];
  page = 1;
  category = 'general';
  loading = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || 'general';
      this.page = 1;
      this.secondaryArticles = [];
      this.loadNews();
    });
  }

  loadNews(event?: any) {
    this.loading = true;

    const url = `${this.apiUrl}&category=${this.category}&pageSize=10&page=${this.page}&apiKey=${this.apiKey}`;

    this.http.get<{ articles: Article[] }>(url).subscribe({
      next: (res) => {
        console.log('✅ Noticias cargadas:', res);

        if (this.page === 1 && res.articles.length > 0) {
          this.mainArticle = res.articles[0];
          this.secondaryArticles = res.articles.slice(1);
        } else {
          this.secondaryArticles = [...this.secondaryArticles, ...res.articles];
        }

        this.page++;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error('❌ Error cargando noticias', err);
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }
}
