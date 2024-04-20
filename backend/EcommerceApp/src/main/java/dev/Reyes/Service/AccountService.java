package dev.Reyes.Service;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.Reyes.Repository.AccountRepository;
import dev.Reyes.Entity.Account;


import java.util.List;

@Service
@Transactional
public class AccountService {
    AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository){
        this.accountRepository = accountRepository;
    }

    public Account addNewUser(Account newUser){
        return accountRepository.save(newUser);
    }

    public Account findByEmail(String email){
        return accountRepository.findByEmail(email);
    }

}
