using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class UserDetailManager : IUserDetailService
    {

        IUserDetailDal _userDetailDal;

        public UserDetailManager(IUserDetailDal userDetailDal)
        {
            _userDetailDal = userDetailDal;
        }

        public List<UserDetail> GetTaxisByUsername(string username)
        {
            return _userDetailDal.GetAllFilter(u => u.username == username);
        }
    }
}
