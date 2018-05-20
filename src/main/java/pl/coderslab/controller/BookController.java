package pl.coderslab.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.coderslab.model.Book;
import pl.coderslab.service.MemoryBookService;

@RestController
@RequestMapping("/books")
public class BookController {

	@Autowired
	private MemoryBookService memoryBookService;

	@GetMapping("/{id}")
	public Book book(@PathVariable long id) {
		return memoryBookService.getById(id);
	}

	@PostMapping("/")
	public boolean addBook(HttpServletRequest request, @RequestBody Book book) {
		memoryBookService.addBook(book);
		return true;
	}

	@RequestMapping("/")
	public List<Book> list() {
		return memoryBookService.getList();
	}

	@PutMapping("/")
	public boolean update(HttpServletRequest request, @RequestBody Book book) {
		memoryBookService.update(book);
		return true;
	}

	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable long id) {
		return memoryBookService.delete(id);
	}

}