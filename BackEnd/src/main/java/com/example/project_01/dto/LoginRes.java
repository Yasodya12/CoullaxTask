package com.example.project_01.dto;

import java.util.ArrayList;
import java.util.List;

public class LoginRes {
    private String email;
    private String token;
    private List<String> roles;
    private String id;

    public LoginRes(String email, String token,String id) {
        this.email = email;
        this.token = token;
        this.id=id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}