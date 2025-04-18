package it.accenture.viaggi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/")
public class webController {
	
	@GetMapping("/")
	public String showLogin() {
		return "redirect:/html/login.html";
	}
	
	@GetMapping("/registrazione")
	public String showRegister() {
		return "redirect:/html/register.html";
	}
	
}
