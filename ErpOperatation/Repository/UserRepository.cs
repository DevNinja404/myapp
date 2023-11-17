using ErpOperatation.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ErpOperatation.Repository
{
    public interface IUserRepository
    {
        Task<UserModel> AuthenticateAsync(string username, string password);
    }

    public class UserRepository : IUserRepository
    {
        private readonly APIDbContext _appDBContext;

        public UserRepository(APIDbContext context)
        {
            _appDBContext = context;
        }

        public async Task<UserModel> AuthenticateAsync(string username, string password)
        {
            return await _appDBContext.Users.SingleOrDefaultAsync(u => u.UserName == username && u.Password == password);
        }

    }

}
