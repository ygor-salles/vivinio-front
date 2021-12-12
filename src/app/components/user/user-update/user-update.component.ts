import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user: User = {} as User;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.userService.readById(id).subscribe((user) => {
        delete user.password
        this.user = user;
    });
  }

  updateUser(): void {
    console.log(this.user)
    const userUpdate = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password
    }
    this.userService.update(userUpdate).subscribe(() => {
      this.userService.showMessage('Usuário atualizado com sucesso!')
      this.router.navigate(['/users'])
    })
  }
  
  cancel(): void {
    this.router.navigate(['/users'])
  }

}
