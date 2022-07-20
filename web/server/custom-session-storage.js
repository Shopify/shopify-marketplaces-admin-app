import db from '../models';

class CustomSessionStorage {
  storeCallback = async (session) => {
    try {
      // Inside our try, we use the `setAsync` method to save our session.
      // This method returns a boolean (true if successful, false if not)
      const [instance] = await db.Session.upsert({
        sessionId: session.id,
        sessionData: JSON.stringify(session),
      });

      return Boolean(instance);
    } catch (err) {
      // throw errors, and handle them gracefully in your application
      throw new Error(err);
    }
  };

  loadCallback = async (id) => {
    try {
      // Inside our try, we use `getAsync` to access the method by id
      // If we receive data back, we parse and return it
      // If not, we return `undefined`
      let instance = await db.Session.findOne({
        where: {
          sessionId: id,
        },
      });
      if (instance) {
        return JSON.parse(instance.sessionData);
      } else {
        return undefined;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  /*
    The deleteCallback takes in the id, and uses the redis `del` method to delete it from the store
    If the session can be deleted, return true
    Otherwise, return false
  */
  deleteCallback = async (id) => {
    try {
      // Inside our try, we use the `delAsync` method to delete our session.
      // This method returns a boolean (true if successful, false if not)
      const numDestroyed = await db.Session.destroy({
        where: {
          sessionId: id,
        },
      });
      return numDestroyed > 0;
    } catch (err) {
      throw new Error(err);
    }
  };
}

// Export the class
export default CustomSessionStorage;
