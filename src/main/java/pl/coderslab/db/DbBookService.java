package pl.coderslab.db;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;

import pl.coderslab.model.Book;
import pl.coderslab.service.BookService;

//@RestController
@RequestMapping("/books")
public class DbBookService implements BookService {

	
	
	/*
	 * zaimplementować metody dao-db
	 */
	
	
	
	public List<Book> getList() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setList(List<Book> list) {
		// TODO Auto-generated method stub
		
	}

	public void addBook(Book book) {
		// TODO Auto-generated method stub
		
	}

	public Book getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean update(Book bookForUpdate) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean delete(long id) {
		// TODO Auto-generated method stub
		return false;
	}

}
