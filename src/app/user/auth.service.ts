import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CognitoUser, CognitoUserAttribute, CognitoUserPool, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

import { User } from './user.model';

// Create a POOL_DATA from the credentials from Cognito.
const POOL_DATA = {
  UserPoolId: 'us-east-1_wSs42HenN',
  ClientId: '44bndgg1u34qe6fg6fpr9khtfc',
};

// Creating a object from the CognitoUserPool.
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  // Store the user after the Cognito request is done.
  registeredUser: CognitoUser;


  constructor(private router: Router) {}
  
  signUp(username: string, email: string, password: string): void {
    this.authIsLoading.next(true);

    // Cognito get by default Username and Password. We send the email also.
    const user: User = {
      username: username,
      email: email,
      password: password
    };

    // We need a list for the sending the Congito attributes.
    const attrList: CognitoUserAttribute[] = [];

    // Define what to be send to Cognito.
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };

    // Sending all the attributes to the list that we created from Cognito user Attributes.
    attrList.push(new CognitoUserAttribute(emailAttribute));

    // signUp metthod to the object that we created from UserPool. 
    // It sends HTTP request to the AWS Servers and validate the request.
    // The code after this function will be executed after we get response.
    userPool.signUp(user.username, user.password, attrList, null, (err, result) => {
      if (err){
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.registeredUser = result.user;
    });
    return;
  }
  confirmUser(username: string, code: string) {
    this.authIsLoading.next(true);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    // Confirm the user registration. Checks for the userData.
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        this.authDidFail.next(true);
        this.authIsLoading.next(false);
        return;
      }
      this.authDidFail.next(false);
      this.authIsLoading.next(false);
      this.router.navigate(['/']);
    });
  }

  signIn(username: string, password: string): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    // Create Authentication details from Cognito and pass Username and pass data. 
    const authDetails = new AuthenticationDetails(authData);

    // Create userData with userName and userPool that we have.
    const userData = {
      Username: username,
      Pool: userPool
    };

    // With the userData we create a Cognito User.
    const cognitoUser = new CognitoUser(userData);

    // Authenticate user by passing the authDetails. 
    // The function execute onSuccess() - if the user is authenticated. 
    // The function execute onFailure() - if the user is NOT authenticated. 

    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess (result: CognitoUserSession){
        that.authStatusChanged.next(true);
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        
        console.log(result);
      },
      onFailure(err) {
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
        console.log(err);
      }

    });
    this.authStatusChanged.next(true);
    return;
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    // SignOut or remove the Token.
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }
  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err){
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }

        });
      }
      observer.complete();
    });
    return obs;
  }
  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }
}
