package pl.coderslab.service;

import java.util.List;

import org.springframework.stereotype.Service;

import pl.coderslab.model.Book;

//@Service
public interface BookService {

	 List<Book> getList();

	 void setList(List<Book> list);
	
	 void addBook (Book book);

	 Book getById(long id);

	 boolean update(Book bookForUpdate);

	 boolean delete(long id);

}
