package com.leandronsousa.exemplos.websocket.controller;

import com.leandronsousa.exemplos.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/sync")
@CrossOrigin(origins = "*", maxAge = 3600L)
public class WebSocketController {

    @Autowired
    private WebSocketService service;

    @PutMapping
    public ResponseEntity<String> execute() {
        service.send();
        return ResponseEntity.ok().build();
    }

}
