package pl.coderslab.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import pl.coderslab.model.Book;

@Service
public class MemoryBookService implements BookService {
	
	
	private List<Book> list;
	
	public MemoryBookService() {
		list = new ArrayList<Book>();
		list.add(new Book(1L, "9788324631766", "Thinking in Java", "Bruce Eckel",
			"Helion", "programming"));
		list.add(new Book(2L, "9788324627738", "Rusz glowa, Java.",
			"Sierra	Kathy,	Bates Bert", "Helion", "programming"));
		list.add(new Book(3L, "9780130819338", "Java 2. Podstawy",
			"Cay Horstmann, Gary Cornell", "Helion", "programming"));
	}
	
	public List<Book> getList() {
		return list;
	}
	
	public void setList(List<Book> list) {
		this.list = list;
	}
	
	public void addBook (Book book) {
		list.add(book);
	}
	
	public Book getById(long id) {
		for (Book book : list) {
			if (id == book.getId()) {
				return book;
			}
		}
		return null;
	}
	
	public boolean update(Book bookForUpdate) {
		for (Book book : list) {
			if (book.getId() == bookForUpdate.getId()) {
				list.set(list.indexOf(book), bookForUpdate);
				return true;
			}
		}
		return false;
	}
	
	public boolean delete(long id) {
		for (Book book : list) {
			if (id == book.getId()) {
				list.remove(book);
				return true;
			}
		}
		return false;
	}

}
