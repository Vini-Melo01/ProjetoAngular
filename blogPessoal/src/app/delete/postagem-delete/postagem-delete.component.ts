import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Postagem } from '../../model/Postagem';
import { Tema } from '../../model/Tema';
import { PostagemService } from '../../service/postagem.service';
import { TemaService } from '../../service/tema.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {
  postagem: Postagem = new Postagem()
  idPost:number 


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
  ) { }

  ngOnInit() {

    window.scroll(0, 0)
    if (environment.token == '') {
      //alert('Sua sessão expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })

  }

    apagar() {
      this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
        alert('Postagem apagada com sucesso')
        this.router.navigate(['/inicio'])
      })

  }

}
