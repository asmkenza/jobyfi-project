import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobs, addJob, updateJob, deleteJob, getJobStats } from '../../api/jobs';

export const fetchJobsAsync = createAsyncThunk('jobs/fetchJobs', async (token) => {
  const response = await fetchJobs(token);
  return response;
});

export const addJobAsync = createAsyncThunk('jobs/addJob', async ({ jobData, token }) => {
  const response = await addJob(jobData, token);
  return response;
});

export const updateJobAsync = createAsyncThunk('jobs/updateJob', async ({ jobId, jobData, token }) => {
  const response = await updateJob(jobId, jobData, token);
  return response;
});

export const deleteJobAsync = createAsyncThunk('jobs/deleteJob', async ({ jobId, token }) => {
  await deleteJob(jobId, token);
  return jobId;
});

export const getJobStatsAsync = createAsyncThunk('jobs/getJobStats', async (token) => {
  const response = await getJobStats(token);
  return response;
});

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    stats: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addJobAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJobAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(addJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateJobAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJobAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteJobAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJobAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = state.jobs.filter(job => job._id !== action.payload);
      })
      .addCase(deleteJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getJobStatsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobStatsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getJobStatsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
