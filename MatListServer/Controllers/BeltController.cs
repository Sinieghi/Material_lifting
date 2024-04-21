using Model;
namespace Controller;
class BeltController
{
    private Belt BeltList { get; set; }

    public Belt GetBeltList()
    {
        return this.BeltList;
    }
}